import Loading from '@/app/loading';
import HeaderApp from '@/components/header/header-component/header-launch-app';
import { Suspense, type ReactNode } from 'react'

interface StoriesLayoutProps {
    children: ReactNode
}

const StoriesLayout = ({ children }: StoriesLayoutProps) => {
    return (
        <div className="h-full min-h-screen animate-fadeIn overflow-hidden bg-charcoal ">
            <div className="mx-6">
                <HeaderApp theme={"black"} />
            </div>
            <Suspense fallback={<Loading />}>{children} </Suspense>
        </div>
    );

}

export default StoriesLayout
