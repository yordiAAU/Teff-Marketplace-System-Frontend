import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, MapPin, ArrowRight } from "lucide-react";
import { registerSchema, type RegisterFormValues } from "@/features/auth/schemas/auth.schemas";
import { useAuthRegisterForm } from "@/features/auth/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterPage() {
  const { submit, isPending } = useAuthRegisterForm();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "customer" },
  });

  const role = watch("role");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl"
      >
        <div className="p-8 lg:p-12">
          <div className="mb-8 text-center">
            <Link to="/" className="mb-4 inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <span className="text-xl font-bold text-white">T</span>
              </div>
              <span className="font-serif text-2xl font-bold text-slate-900">TeffMarket</span>
            </Link>
            <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <Label>Role</Label>
              <Select value={role} onValueChange={(v) => setValue("role", v as RegisterFormValues["role"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Field icon={User} label="Full Name" error={errors.fullName?.message}>
              <Input {...register("fullName")} placeholder="John Doe" />
            </Field>
            <Field icon={Mail} label="Email" error={errors.email?.message}>
              <Input type="email" {...register("email")} placeholder="email@example.com" />
            </Field>
            <Field icon={Lock} label="Password" error={errors.password?.message}>
              <Input type="password" {...register("password")} placeholder="Min 8 chars, upper, lower, digit" />
            </Field>
            <Field icon={Phone} label="Phone Number" error={errors.phoneNumber?.message}>
              <Input {...register("phoneNumber")} placeholder="+251911234567" />
            </Field>
            <Field icon={MapPin} label="Region" error={errors.region?.message}>
              <Input {...register("region")} placeholder="Addis Ababa" />
            </Field>

            <Button type="submit" className="w-full py-6" disabled={isPending}>
              {isPending ? "Creating..." : "Create Account"}
              {!isPending && <ArrowRight size={20} />}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Field({ icon: Icon, label, error, children }: {
  icon: typeof User;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative mt-1">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <div className="pl-8">{children}</div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
