import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
    Github,
    Twitter,
} from "lucide-react"


export function SiteHeader() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <Link
                            href="https://github.com/gautam-ghai"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={buttonVariants({
                                    size: "sm",
                                    variant: "ghost",
                                })}
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </div>
                        </Link>
                        <Link
                            href="https://twitter.com/_gautamghai"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div
                                className={buttonVariants({
                                    size: "sm",
                                    variant: "ghost",
                                })}
                            >
                                <Twitter className="h-5 w-5 fill-current" />
                                <span className="sr-only">Twitter</span>
                            </div>
                        </Link>
                        <ThemeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
