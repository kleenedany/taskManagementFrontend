import { Routes } from '@angular/router';
import { ProjectPageContainer } from './components/project-page/project/project-page-container/project-page-container';

export const routes: Routes = [
    {path: "", redirectTo: "/project", pathMatch: "full"}, 
    {path: "project", component: ProjectPageContainer }
    
];
