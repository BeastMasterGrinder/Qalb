import CustomBreadcrumb from "@/components/journal/bread-crumb";
export default function JournalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <CustomBreadcrumb className="px-10 py-6 mb-5 md:mb-20" />
            {children}
        </div>
    );
}