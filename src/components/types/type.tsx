interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}interface SectionHeadingProps {
    subtitle: string;
    title: string;
    description: string;
}interface ServiceCardProps {
    icon: React.ReactNode; // Icon can be any React element
    title: string;
    description: string;
}interface ProcessStepProps {
    number: string | number; // Assuming numbers are displayed as strings
    title: string;
    description: string;
}interface ExpertiseItemProps {
    title: string;
    description: string;
}interface TestimonialCardProps {
    quote: string;
    author: string;
    position: string;
    image?: string; // Optional because it defaults to "/placeholder.svg"
}interface TeamMemberProps {
    name: string;
    position: string;
    image?: string; // Optional because it defaults to "/placeholder.svg"
}interface SocialIconProps {
    icon: string; // Assuming `icon` is a string name/description
}interface FooterLinkProps {
    href: string;
    label: string;
}