import React, {Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';
import Error404 from '../Pages/Error404/Error404';
import Preloader from "../Preloader/Preloader";
import MyErrorBoundary from "../ErrorBoundary/MyErrorBoundary";
import {LastLocationProvider} from 'react-router-last-location';
import MaterialPreview from "../MaterialPreview/MaterialPreview";

const Home = React.lazy(() => import('../Pages/Home/Home'));
const Projects = React.lazy(() => import('../Pages/Projects/Projects'));
const NewsFeed = React.lazy(() => import('../Pages/NewsFeed/NewsFeed'));
const TeachingSpace = React.lazy(() => import('../Pages/TeachingSpace/TeachingSpace'));
const TeachingSpaceMaterialsList = React.lazy(() => import('../Pages/TeachingSpace/TeachingSpaceMaterialsList'));
const MaterialNewsItem = React.lazy(() => import('../MaterialNewsContent/MaterialNewsItem'));
const Documents = React.lazy(() => import("../Pages/Documents/Documents"));
const AboutTheCenter = React.lazy(() => import("../Pages/AboutTheCenter/AboutTheCenter"));
const Person = React.lazy(() => import("../Pages/AboutTheCenter/Staff/Person"));
const WorkPlan = React.lazy(() => import("../Pages/WorkPlan/WorkPlan"));
const Contacts = React.lazy(() => import("../Pages/Сontacts/Contacts"));
const SignIn = React.lazy(() => import('../Pages/AuthorizeRegister/SignIn'));
const SignUp = React.lazy(() => import('../Pages/AuthorizeRegister/SignUp'));
const SectionInDevelopment = React.lazy(() => import("../Pages/SectionInDevelopment/SectionInDevelopment"));
const SearchPage = React.lazy(() => import('../Pages/SearchPage/SearchPage'));
const Courses = React.lazy(() => import('../Pages/Courses/Courses'));


export default class Router extends React.Component {
    render() {
        return (
            <LastLocationProvider>
                <MyErrorBoundary>
                    <Suspense fallback={<Preloader/>}>
                        <Switch>
                            <Route
                                exact
                                path='/'
                                component={Home}/>
                            <Route
                                exact
                                path='/projects'
                                component={Projects}/>
                            <Route
                                exact
                                path='/news-feed'
                                component={NewsFeed}/>
                            <Route
                                exact
                                path='/news-feed/:id'
                                component={MaterialNewsItem}/>
                            <Route
                                exact
                                path='/teaching-space'
                                component={TeachingSpace}/>
                            <Route
                                exact
                                path='/teaching-space/:category'
                                component={TeachingSpaceMaterialsList}/>
                            <Route
                                exact
                                path="/teaching-space/:category/:id"
                                component={MaterialNewsItem}/>
                            <Route
                                exact
                                path='/documents'
                                component={Documents}/>
                            <Route
                                exact
                                path='/documents/:id'
                                component={MaterialNewsItem}/>
                            <Route
                                exact
                                path='/about-the-center'
                                component={AboutTheCenter}/>
                            <Route
                                exact
                                path='/about-the-center/:url'
                                component={AboutTheCenter}/>
                            <Route
                                exact
                                path='/about-the-center/:url/:person/:id'
                                component={Person}/>
                            <Route
                                exact
                                path='/work-plan'
                                component={WorkPlan}/>
                            <Route
                                exact
                                path='/contacts'
                                component={Contacts}/>
                            <Route
                                exact
                                path='/sign-in'
                                component={SignIn}/>
                            <Route
                                exact
                                path='/sign-up'
                                component={SignUp}/>
                            <Route
                                exact
                                path='/section-in-development'
                                component={SectionInDevelopment}/>
                            <Route
                                exact
                                path='/search-page'
                                component={SearchPage}/>
                            <Route
                                // exact
                                path='/courses'
                                component={Courses}/>
                            {/*<Route*/}
                            {/*    exact*/}
                            {/*    path='/courses/:id'*/}
                            {/*    component={Courses}/>*/}
                            <Route
                                exact
                                path='/show-preliminary-material/:id/:type/:guid'
                                component={MaterialPreview}/>
                            <Route
                                path="*">
                                <Error404/>
                            </Route>
                        </Switch>
                    </Suspense>
                </MyErrorBoundary>
            </LastLocationProvider>
        )
    }
}