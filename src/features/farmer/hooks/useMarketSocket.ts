import { useEffect, useRef, useState, useCallback } from "react";
import { getSocket } from "@/lib/socket";
import type { MarketTrendPoint_Live, MarketUpdateEvent } from "@/types/api.types";

const MAX_POINTS = 30;

interface UseMarketSocketOptions {
  productTypeId: string;
  initialPoints?: MarketTrendPoint_Live[];
}

interface UseMarketSocketReturn {
  currentPrice: number | null;
  lastUpdated: Date | null;
  priceHistory: MarketTrendPoint_Live[];
  isConnected: boolean;
}

/**
 * Manages the WebSocket lifecycle for live market updates.
 * - Joins/leaves rooms on productTypeId change
 * - Maintains a rolling buffer of up to 30 price points
 * - Initialises from the /trend API initial data
 */
export function useMarketSocket({
  productTypeId,
  initialPoints = [],
}: UseMarketSocketOptions): UseMarketSocketReturn {
  const [priceHistory, setPriceHistory] = useState<MarketTrendPoint_Live[]>(initialPoints);
  const [currentPrice, setCurrentPrice] = useState<number | null>(
    initialPoints.length > 0 ? initialPoints[initialPoints.length - 1].averagePrice : null
  );
  const [lastUpdated, setLastUpdated] = useState<Date | null>(
    initialPoints.length > 0 ? new Date(initialPoints[initialPoints.length - 1].timestamp) : null
  );
  const [isConnected, setIsConnected] = useState(false);
  const previousRoomRef = useRef<string | null>(null);

  // Sync when initial points arrive from the API query
  useEffect(() => {
    if (initialPoints.length > 0) {
      setPriceHistory(initialPoints);
      const last = initialPoints[initialPoints.length - 1];
      setCurrentPrice(last.averagePrice);
      setLastUpdated(new Date(last.timestamp));
    }
  }, [initialPoints]);

  const handleMarketUpdate = useCallback(
    (data: MarketUpdateEvent) => {
      if (data.productTypeId !== productTypeId) return;

      const newPoint: MarketTrendPoint_Live = {
        timestamp: data.timestamp,
        averagePrice: data.averagePrice,
      };

      setPriceHistory((prev) => {
        const next = [...prev, newPoint];
        return next.length > MAX_POINTS ? next.slice(next.length - MAX_POINTS) : next;
      });
      setCurrentPrice(data.averagePrice);
      setLastUpdated(new Date(data.timestamp));
    },
    [productTypeId]
  );

  useEffect(() => {
    if (!productTypeId) return;

    const socket = getSocket();

    // Leave old room
    if (previousRoomRef.current && previousRoomRef.current !== productTypeId) {
      socket.emit("leave-market", { productTypeId: previousRoomRef.current });
    }

    // Join new room
    socket.emit("join-market", { productTypeId });
    previousRoomRef.current = productTypeId;

    // Connection status
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("market:update", handleMarketUpdate);

    setIsConnected(socket.connected);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("market:update", handleMarketUpdate);
      socket.emit("leave-market", { productTypeId });
      previousRoomRef.current = null;
    };
  }, [productTypeId, handleMarketUpdate]);

  return { currentPrice, lastUpdated, priceHistory, isConnected };
}
