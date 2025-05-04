import CustomBreadcrumb from "@/components/journal/bread-crumb";
export default function JournalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mt-20">
            <CustomBreadcrumb />
            <div className="container mx-auto p-4">
                {children}
            </div>
        </div>
    );
}