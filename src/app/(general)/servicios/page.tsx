import ServiceCard from "@/app/components/ui/ServiceCard";

export default function Servicios() {
    return (


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <ServiceCard/>
            <ServiceCard/>
            <ServiceCard/>
            <ServiceCard/>
            <ServiceCard/>
            <ServiceCard/>
        </div>

    );
}