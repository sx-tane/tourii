import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export function ChapterTabs() {
    return (
        <Tabs defaultValue="chapters" className="w-[450px]">
            <TabsList className="w-full grid-cols-3 bg-warmGrey3 flex justify-between py-5">
                <TabsTrigger className=" px-5 py-2 uppercase tracking-[0.15rem] text-xs font-medium text-charcoal" value="chapters">Chapters</TabsTrigger>
                <TabsTrigger className=" px-5 py-2 uppercase tracking-[0.15rem] text-xs font-medium text-charcoal" value="characters">Characters</TabsTrigger>
                <TabsTrigger className=" px-5 py-2 uppercase tracking-[0.15rem] text-xs font-medium text-charcoal" value="world-lore">World Lore</TabsTrigger>
            </TabsList>
            {/* TODO: Chapters Content */}
            <TabsContent value="chapters">
                <Card>
                    <CardHeader>
                        <CardTitle>Chapter 1</CardTitle>
                    </CardHeader>
                </Card>
            </TabsContent>
            {/* TODO: Characters Content */}
            <TabsContent value="characters">
                <Card>
                    <CardHeader>
                        <CardTitle>Characters</CardTitle>
                    </CardHeader>
                </Card>
            </TabsContent>
            {/* TODO: World Lore Content */}
            <TabsContent value="world-lore">
                <Card>
                    <CardHeader>
                        <CardTitle>World</CardTitle>
                    </CardHeader>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
