import { Routes } from '@angular/router';
import { Project } from './components/project/project';

export const routes: Routes = [
    {path: "", redirectTo: "/project", pathMatch: "full"}, 
    {path: "project", component: Project }
    
];
