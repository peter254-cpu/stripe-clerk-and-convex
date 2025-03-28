import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";



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
                    <CardContent className="flex-grow">
                      <CardTitle className="text-xl mb-2 hover:underline">
                        {course.title}
                      </CardTitle>
                    </CardContent>
                    </Link>

                    <CardFooter className="flex justify-between items-center">
                          <Badge variant="default" className="text-lg px-3 py-1">
                            $ {course.price.toFixed(2)}
                          </Badge>
                          <SignedIn>
                            <Button variant={"outline"}>
                              Enroll
                            </Button>
                          </SignedIn>
                        <SignedOut>
                          <SignInButton mode="modal">
                            <Button variant={"outline"}>
                              Enroll Now
                            </Button>
                          </SignInButton>
                        </SignedOut>
                </CardFooter>
            </Card>
          ))}
        </div>
        <div>
          <Link href={"/pro"} className="flex justify-center">
            <Button size={"lg"} className="group hover:bg-purple-600 transition-colors duration-300">
              MemberShip Plans
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>  
        </div>       
    </main>
  </div>
  );
}
