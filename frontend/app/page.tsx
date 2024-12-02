"use client";
import Layout from "./_components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardCheck, UserCheck, Clock, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/login"); // Redirect to the login page
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-500 to-blue-700">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4 text-white">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Simplify Task Management
                    </h1>
                    <div className="max-w-[600px] text-gray-200 md:text-xl">
                      Organize, track, and manage your tasks efficiently with our powerful and intuitive Task Management System.
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button
                      className="bg-white text-blue-600 hover:bg-gray-100"
                      onClick={handleGetStarted}
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-black bg-blue-500 hover:bg-white hover:text-blue-600"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
                Why Choose Our Task Management System
              </h2>
              <div className="grid gap-6 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <ClipboardCheck className="h-12 w-12 text-blue-600" />
                    <h3 className="text-2xl font-bold">Streamlined Workflow</h3>
                    <div className="text-gray-500">
                      Organize tasks with ease and keep your team aligned on every project.
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <Clock className="h-12 w-12 text-blue-600" />
                    <h3 className="text-2xl font-bold">Efficient Time Management</h3>
                    <div className="text-gray-500">
                      Track deadlines and manage time effectively to meet your goals.
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    <UserCheck className="h-12 w-12 text-blue-600" />
                    <h3 className="text-2xl font-bold">Team Collaboration</h3>
                    <div className="text-gray-500">
                      Collaborate seamlessly with your team and ensure everyone is on the same page.
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Ready to Get Started Section */}
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Ready to Boost Your Productivity?
                  </h2>
                  <div className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Start using our Task Management System today and take control of your tasks. Simplify your workflow and achieve your goals faster.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}




