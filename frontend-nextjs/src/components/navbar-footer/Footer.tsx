import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t mt-8 px-4 py-6 bg-background text-muted-foreground">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} TodoApp. All rights reserved.</p>

        <div className="flex gap-4 text-sm">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link
            href="https://github.com/Qosanglesz/todo-app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
