import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/auth.schemas";
import { useAuthLoginForm } from "@/features/auth/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { submit, isPending } = useAuthLoginForm();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50"
      >
        <div className="p-8 lg:p-12">
          <div className="mb-10 text-center">
            <Link to="/" className="mb-6 inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <span className="text-xl font-bold text-white">T</span>
              </div>
              <span className="font-serif text-2xl font-bold text-slate-900">TeffMarket</span>
            </Link>
            <h2 className="mb-2 text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-slate-500">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <Input id="email" type="email" placeholder="name@company.com" className="pl-12 py-3.5" {...register("email")} />
              </div>
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <Input id="password" type="password" placeholder="••••••••" className="pl-12 py-3.5" {...register("password")} />
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full py-6" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign In"}
              {!isPending && <ArrowRight size={20} />}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-bold text-primary hover:underline">Create account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
