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

    const project = useUserStore((state) => state.user?.projects?.find((project) => project.$id === projectId))

    const createProject = async (project: CreateProjectProp) => {
        let models: string | undefined;
        try {

            await wrapAPICall(async () => {
                const models = await apertursProject.createProject({
                    ...project
                })
                await refreshProjects()
                console.log({ models })
                return models.response

            }).then((value) => {

                models = value
                console.log({ models }, "new models")
            })


        } catch (error) {
            throw error
        }
        finally {
            return models
        }
    }


    const updateContext = async (questions_anwsers_json_string: string) => {
        try {
            if (projectId) {
                wrapAPICall(async () => {

                    await apertursProject.updateContext(questions_anwsers_json_string, projectId)
                    await refreshProjects()
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
        updateContext,
        project
    }

}