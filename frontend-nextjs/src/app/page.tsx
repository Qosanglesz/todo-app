import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight} from "lucide-react";

export default function Home() {
    return (
        <div className="flex container py-24 sm:py-32 justify-center items-center min-h-screen px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                        Organize your tasks with ease
                    </h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        TaskMaster helps you manage your tasks efficiently, so you can focus on what matters most.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Link href="/signup">
                        <Button size="lg" className="gap-1.5">
                            Get started <ArrowRight className="h-4 w-4"/>
                        </Button>
                    </Link>
                    <Link href="https://github.com/Qosanglesz/todo-app">
                        <Button size="lg" variant="outline">
                            View Github
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
