import Cookies from "js-cookie";
import { apiSlice } from "../services/apiSlice";
import { Question, QuestionInfo } from "@/app/interface";

const questionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllQuestionsByContestId: builder.query<Question[], string>({
            query: (contestId) => ({
                url: `/question/contest/${contestId}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
                transformResponse: (response: { data: Question[] }) => {
                    return response.data
                }
            }),
        }),
        getAllTeamQuestionsByContestId: builder.query<QuestionInfo[], any>({
            query: ({contestId, teamUsername}) => ({
                url: `/question/contest/${contestId}/team/${teamUsername}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
            }),
        }),
        getQuestionById: builder.query<Question, string>({
            query: (questionId) => ({
                url: `/question/single/${questionId}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
                transformResponse: (response: { data: Question }) => {
                    return response.data
                }
            }),
        }),
        createQuestion: builder.mutation({
            query: ({questionNumber, question, answer, pointProvided, questionImage, contestId}) => ({
                url: '/question/create',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
                body: {questionNumber, question, answer, pointProvided, questionImage, contestId},
            }),
        }),
        editQuestion: builder.mutation({
            query: ({questionId, questionNumber, question, answer, pointProvided, questionImage, contestId}) => ({
                url: `/question/edit/${questionId}`,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
                body: {questionNumber, question, answer, pointProvided, questionImage, contestId},
            }),
        }),
        deleteQuestion: builder.mutation({
            query: (questionId: number) => ({
                url: `/question/delete/${questionId}`,
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
            }),
        }),
    }),
});

export const { useGetAllQuestionsByContestIdQuery, useGetAllTeamQuestionsByContestIdQuery, useGetQuestionByIdQuery, useCreateQuestionMutation, useEditQuestionMutation, useDeleteQuestionMutation } = questionApiSlice;