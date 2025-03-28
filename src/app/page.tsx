import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { CardHeader } from "@/components/ui/card";



export default async function Home() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const courses = await convex.query(api.courses.getCourses)

return  (
  <div className="flex flex-col min-h-screen ">
    <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight max-w-2xl mx-auto">Get World-class Skills</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Master competitive skills in demand all over the globe from our higly skilled teachers who deliver world class knowledge</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {courses.slice(0, 3).map(course => (
            <Card key={course._id} className="flex flex-col">
                <Link href={`/courses/${course._id}`} className="cursor-pointer">
                    <CardHeader>
                        <Image
                          src={course.imageUrl}
                          alt={course.title}
                          width={640}
                          height={360}
                          className="rounded-md object-cover"                     
                        />
                    </CardHeader>
                </Link>
            </Card>
          ))}
        </div>       
    </main>
  </div>
  );
}
