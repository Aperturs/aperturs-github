import { useUserStore } from '@/stores/user';
import React from 'react';
import { useUser } from './useUser';
import { useAPICallWrapper } from './useAPICallWrapper';
import { CreateProjectProp, apertursProject } from '@/appwrite/project';
import { Models } from 'appwrite';

export function useProject(projectId?: string) {
    const { refreshUser } = useUser()
    const {
        APICallError, isAPICallFailure, isAPICallLoading, isAPICallSuccess, wrapAPICall
    } = useAPICallWrapper()
    const projects = useUserStore((state) => state.user?.projects)
    const refreshProjects = () => refreshUser()

    const createProject = async (project: CreateProjectProp) => {
        let models: Models.Execution | undefined
        try {

            wrapAPICall(async () => {
                const models = await apertursProject.createProject({
                    ...project
                })
                await refreshProjects()
                return models

            }).then((value) => {
                models = value
            })


        } catch (error) {
            throw error
        }
        return models
    }

    const updateContext = async (questions_anwsers_json_string: string) => {
        try {
            if (projectId) {
                wrapAPICall(async () => {

                    await apertursProject.updateContext(questions_anwsers_json_string, projectId)
                });
            }
        }
        catch (error) {
            throw error
        }
    }


    return {
        projects,
        refreshProjects,
        createProject,
        loading: isAPICallLoading,
        failure: isAPICallFailure,
        error: APICallError,
        success: isAPICallSuccess,
        updateContext

    }

}