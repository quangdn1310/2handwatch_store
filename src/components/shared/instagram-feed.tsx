import Image from 'next/image';
import Link from 'next/link';

interface InstagramPost {
    id: string;
    image: string;
    link: string;
}

interface InstagramFeedProps {
    posts?: InstagramPost[];
}

// Placeholder posts for demo
const defaultPosts: InstagramPost[] = [
    { id: '1', image: '/images/watches/watch-1.png', link: '#' },
    { id: '2', image: '/images/watches/watch-2.png', link: '#' },
    { id: '3', image: '/images/watches/watch-3.png', link: '#' },
    { id: '4', image: '/images/watches/watch-4.png', link: '#' },
];

// Instagram Icon component
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
    </svg>
);

export function InstagramFeed({ posts = defaultPosts }: InstagramFeedProps) {
    return (
        <section className="py-24 bg-black">
            <div className="container space-y-12">
                {/* Instagram Gallery */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={post.link}
                            className="relative aspect-square overflow-hidden border border-[var(--color-border)] group"
                        >
                            <Image
                                src={post.image}
                                alt="Instagram post"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <InstagramIcon className="w-8 h-8 text-white scale-90 group-hover:scale-100 transition-transform duration-300" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Link Area */}
                <div className="text-center pt-8">
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.3em] font-bold mb-4">
                        Follow the story
                    </p>
                    <Link
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-white hover:text-[var(--color-accent)] transition-colors font-serif italic text-lg"
                    >
                        View more on Instagram
                    </Link>
                </div>
            </div>
        </section>
    );
}
