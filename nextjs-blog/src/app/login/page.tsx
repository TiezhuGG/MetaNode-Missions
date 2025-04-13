import { Button } from "@/components/ui/button";
import { login, signup } from "./actions";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="p-20">
        <form className="flex flex-col justify-center items-center space-y-8">
          <div className="flex gap-3">
            <label className="w-10" htmlFor="email">
              邮箱:
            </label>
            <input
              className="outline rounded px-3 py-1 w-[280px]"
              placeholder="请输入邮箱"
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="flex gap-3">
            <label className="w-10" htmlFor="password">
              密码:
            </label>
            <input
              className="outline rounded px-3 py-1 w-[280px]"
              placeholder="请输入密码"
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          <div className="flex gap-4">
            <Button formAction={login}>Log in</Button>
            <Button formAction={signup}>Sign up</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
