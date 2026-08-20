import blog1 from "@/assets/home/blog_1.png";
import blog2 from "@/assets/home/blog_2.png";
import blog3 from "@/assets/home/blog_3.png";

export const blogHero = {
    title: "The Crediple Journal",
    description:
        "From digital transformation to product strategy, explore ideas and insights that help businesses make smarter decisions, build better experiences, and create lasting value.",
    cta: { label: "See what we've built", href: "#blog-grid" },
};

/** A paragraph is plain body copy, or an emphasised (bold) callout line. */
export type BlogParagraph = string | { text: string };

export interface BlogSection {
    id: string;
    heading: string;
    paragraphs: BlogParagraph[];
    list?: string[];
    /** Sections default into the table of contents; set false for nested sub-sections. */
    inToc?: boolean;
}

export const blogPosts = [
    {
        id: "1",
        title: "Why Digital Transformation Is More Than Just Technology",
        description:
            "A practical look at how successful transformation connects people, processes, and technology.",
        category: "Technology",
        author: "Crediple",
        date: "Aug 7, 2026",
        readingTime: "6 min read",
        views: 3445,
        comments: 3,
        image: blog1,
        tags: ["Digital Transformation", "Technology", "Business Growth"],
        intro: {
            paragraphs: [
                "Digital transformation is often associated with adopting new technologies, upgrading software, or moving business processes to the cloud. But true digital transformation goes far beyond technology. It is about rethinking how a business operates, serves its customers, makes decisions, and creates value in a rapidly changing digital world.",
            ],
            highlight: "Technology is the enabler. Transformation is the outcome.",
        },
        sections: [
            {
                id: "what-is-digital-transformation",
                heading: "What Is Digital Transformation?",
                paragraphs: [
                    "Digital transformation is the process of using digital technologies to fundamentally improve business operations, customer experiences, and overall business performance. However, simply implementing a new tool or system does not make a business digitally transformed. Real transformation happens when technology is combined with the right strategy, people, processes, and mindset. A company can have the most advanced technology and still struggle if its teams are working with outdated processes or if customers are not getting a better experience.",
                ],
            },
            {
                id: "technology-is-only-one-part",
                heading: "Technology Is Only One Part of the Journey",
                paragraphs: [
                    "Technology provides the foundation for digital transformation, but several other elements determine whether that transformation succeeds.",
                ],
            },
            {
                id: "people-come-first",
                heading: "1. People Come First",
                paragraphs: [
                    "Employees are at the heart of any transformation. Introducing new tools without helping teams understand and adopt them can create resistance rather than progress.",
                    "Successful organizations invest in training, communication, collaboration, and a culture that encourages people to embrace change.",
                ],
                inToc: false,
            },
            {
                id: "processes-need-to-evolve",
                heading: "2. Processes Need to Evolve",
                paragraphs: [
                    "Digitizing an inefficient process does not automatically make it efficient. Businesses need to evaluate existing workflows, identify bottlenecks, remove unnecessary steps, and redesign processes around better outcomes. The goal should not be to simply make an existing process digital. It should be to make the process better.",
                ],
                inToc: false,
            },
            {
                id: "customer-experience-matters",
                heading: "3. Customer Experience Matters",
                paragraphs: [
                    "Digital transformation should ultimately create meaningful value for customers. Whether it is a faster checkout, a simpler onboarding process, personalized recommendations, or quicker customer support, every digital initiative should answer one important question:",
                    { text: "How does this make the customer's experience better?" },
                    "When technology improves convenience, accessibility, speed, and personalization, it becomes a true driver of business value.",
                ],
                inToc: false,
            },
            {
                id: "data-drives-better-decisions",
                heading: "4. Data Drives Better Decisions",
                paragraphs: [
                    "Modern businesses generate enormous amounts of data. But collecting data is only the beginning.",
                    "Organizations need the right systems and processes to turn data into meaningful insights. Data-driven decision-making can help businesses understand customer behavior, identify opportunities, optimize operations, and respond faster to market changes.",
                ],
                inToc: false,
            },
            {
                id: "business-impact",
                heading: "The Business Impact of True Digital Transformation",
                paragraphs: [
                    "When strategy, people, processes, data, and technology work together, digital transformation can help organizations:",
                ],
                list: [
                    "Improve operational efficiency",
                    "Reduce unnecessary costs",
                    "Deliver better customer experiences",
                    "Make faster, data-driven decisions",
                    "Improve collaboration across teams",
                    "Create new products and services",
                    "Respond faster to changing market demands",
                    "Build scalable and future-ready operations",
                ],
            },
            {
                id: "final-thoughts",
                heading: "Final Thoughts",
                paragraphs: [
                    "Digital transformation is not about replacing the old with the new just because new technology exists. It is about creating a smarter, more connected, and more adaptable organization.",
                    {
                        text: "Technology enables transformation, but people, processes, strategy, and customer value make it successful.",
                    },
                    "Businesses that understand this distinction can move beyond simply becoming more digital, and start becoming genuinely more capable, agile, and future-ready.",
                ],
            },
        ] as BlogSection[],
    },
    {
        id: "2",
        title: "Building Technology for a Future That Scales",
        description:
            "Understand the principles behind scalable technology solutions designed to support evolving business needs and long-term growth.",
        category: "Engineering",
        author: "Crediple",
        date: "Aug 15, 2026",
        readingTime: "5 min read",
        views: 2980,
        comments: 2,
        image: blog2,
        tags: ["Scalability", "Architecture", "Growth"],
        intro: {
            paragraphs: [
                "Every fast-growing business eventually hits the same wall: the systems that got them here can't take them further. Scalable technology isn't a nice-to-have, it's the difference between compounding growth and constant firefighting.",
            ],
            highlight: "Scalability is a design decision, not an afterthought.",
        },
        sections: [
            {
                id: "what-scalable-technology-means",
                heading: "What Scalable Technology Really Means",
                paragraphs: [
                    "Scalability is often reduced to 'can it handle more users,' but that's only part of the picture. True scalability means a system can absorb new markets, new data volumes, and new integrations without a ground-up rewrite. It's as much an architectural mindset as it is an engineering practice.",
                ],
            },
            {
                id: "designing-for-long-term-growth",
                heading: "Designing for Long-Term Growth",
                paragraphs: [
                    "Scalable systems are built with modularity, flexibility, and future growth in mind. That means anticipating new business models, data volumes, and integration requirements before they become constraints, and choosing patterns that bend instead of break under pressure.",
                ],
            },
            {
                id: "modularity-over-monoliths",
                heading: "1. Modularity Over Monoliths",
                paragraphs: [
                    "Breaking a system into well-defined, independently deployable modules keeps complexity contained. When one part of the business changes direction, teams can rebuild that module without destabilizing everything else.",
                ],
                inToc: false,
            },
            {
                id: "balancing-speed-and-stability",
                heading: "2. Balancing Speed and Stability",
                paragraphs: [
                    "Fast delivery is important, but it should not come at the expense of reliability. The best technology platforms balance rapid iteration with strong governance, automated testing, and resilience baked in from day one.",
                ],
                inToc: false,
            },
            {
                id: "data-infrastructure-that-grows-with-you",
                heading: "3. Data Infrastructure That Grows With You",
                paragraphs: [
                    "Systems that scale well treat data as a first-class citizen from the start, pipelines, storage, and access patterns are designed to handle ten times the current load without a redesign.",
                ],
                inToc: false,
            },
            {
                id: "business-impact",
                heading: "The Business Impact of Scalable Technology",
                paragraphs: [
                    "When technology is built to scale, businesses gain more than just headroom, it becomes a genuine growth lever:",
                ],
                list: [
                    "Faster expansion into new markets and product lines",
                    "Lower cost per unit of growth over time",
                    "Fewer emergency rewrites and less technical debt",
                    "Confidence to say yes to new opportunities",
                    "Systems that support the business instead of limiting it",
                ],
            },
            {
                id: "final-thoughts",
                heading: "Final Thoughts",
                paragraphs: [
                    "Scalable technology is not about over-engineering for a future that may never arrive. It's about making deliberate choices today that keep tomorrow's options open.",
                    { text: "Growth should reveal the strength of your systems, not their limits." },
                    "Businesses that invest early in scalable foundations spend less time rebuilding and more time compounding their progress.",
                ],
            },
        ] as BlogSection[],
    },
    {
        id: "3",
        title: "Creating Greater Value at Every Stage of Growth",
        description:
            "Learn how scalable digital solutions can continuously evolve with your business and deliver increasing value.",
        category: "Growth",
        author: "Crediple",
        date: "Aug 23, 2026",
        readingTime: "4 min read",
        views: 2260,
        comments: 1,
        image: blog3,
        tags: ["Growth", "Value", "Customer Experience"],
        intro: {
            paragraphs: [
                "Value isn't something a business delivers once and moves on from, it compounds, stage by stage, as products, teams, and customer relationships mature.",
            ],
            highlight: "The way you create value should evolve as fast as your business does.",
        },
        sections: [
            {
                id: "value-looks-different-at-every-stage",
                heading: "Value Looks Different at Every Stage",
                paragraphs: [
                    "A five-person startup and a two-hundred-person scale-up don't create value the same way. The mistake many businesses make is holding onto early-stage habits long after they've outgrown them.",
                ],
            },
            {
                id: "building-systems-that-compound-value",
                heading: "Building Systems That Compound Value",
                paragraphs: [
                    "Digital solutions that continuously evolve with the business deliver more than solutions built for a single moment in time. Investing in adaptable systems means every new capability builds on the last instead of starting from zero.",
                ],
            },
            {
                id: "value-at-the-beginning",
                heading: "1. Value at the Beginning",
                paragraphs: [
                    "The first stage of digital growth is about establishing clarity. What are the business goals? Which workflows matter most? This stage sets the direction for everything that follows.",
                ],
                inToc: false,
            },
            {
                id: "value-through-maturity",
                heading: "2. Value Through Maturity",
                paragraphs: [
                    "As a digital platform matures, it must become more intelligent, automated, and connected. Processes should get smoother, decisions faster, and customer outcomes better with every iteration.",
                ],
                inToc: false,
            },
            {
                id: "value-that-lasts",
                heading: "3. Value That Lasts",
                paragraphs: [
                    "Long-term value is created when systems are designed to adapt. New requirements should be easier to onboard, and the platform should continuously support new services and revenue channels.",
                ],
                inToc: false,
            },
            {
                id: "business-impact",
                heading: "The Business Impact of Continuous Value Creation",
                paragraphs: [
                    "When value creation becomes continuous instead of one-off, businesses see compounding gains:",
                ],
                list: [
                    "Stronger retention as products keep pace with customer needs",
                    "More predictable revenue growth over time",
                    "Faster adoption of new services and features",
                    "Deeper trust across evolving customer relationships",
                    "A clearer growth trajectory across every stage",
                ],
            },
            {
                id: "final-thoughts",
                heading: "Final Thoughts",
                paragraphs: [
                    "Creating greater value at every stage of growth means resisting the urge to treat any milestone as a finish line.",
                    { text: "Every stage is a foundation for the next, not an endpoint." },
                    "Businesses that keep building in this way don't just grow, they compound.",
                ],
            },
        ] as BlogSection[],
    },
] as const;

export type BlogPost = (typeof blogPosts)[number];

export function getBlogPosts() {
    return blogPosts;
}

export function getBlogPostById(id: string) {
    return blogPosts.find((post) => post.id === id);
}
