import './_our-projects.scss';
import React, {Suspense} from 'react';
import MyErrorBoundary from "../../../ErrorBoundary/MyErrorBoundary";
import OurProjectsCarousel from "./OurProjectsCarousel";
import BlocksHeader from "../BlocksHeader/BlocksHeader";
import Preloader from "../../../Preloader/Preloader";


export const OurProjects = () => {

    return(
        <div className="our-projects">
            <BlocksHeader
                blockName='Проекты'
                btnText='смотреть все'
                innerUrl="/projects"
            />
            <MyErrorBoundary
                blockName='Проекты'
            >
                <Suspense
                    fallback={<Preloader/>}
                >
                    <div className="our-projects-block-wrap">
                        <OurProjectsCarousel />
                    </div>
                </Suspense>
            </MyErrorBoundary>
        </div>
    )
}

export default OurProjects;