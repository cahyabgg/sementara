import Cookies from "js-cookie";
import { apiSlice } from "../services/apiSlice";

const forumApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createForum: builder.mutation({
			query: ({ nama }) => ({
				url: '/forum/create/',
				method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
				body: { nama },
			}),
		}),
        getAllForum: builder.mutation({
            query: ({username, userQuery, contestName, questionId}) => ({
                url: `/contest/${contestName}/console/grader/submit`,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
                body: {username, userQuery, contestName, questionId},
            }),
        }),
        getForumDetail: builder.query({
            query: ({username, userQuery, contestName, questionId}) => ({
                url: `/contest/${contestName}/console/grader/run`,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
                body: {username, userQuery, contestName, questionId},
            }),
        }),
        deleteForum: builder.mutation({
            query: ({username, userQuery, contestName, questionId}) => ({
                url: `/contest/${contestName}/console/grader/run`,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
                body: {username, userQuery, contestName, questionId},
            }),
        }),
    }),
});

export const { 
    useCreateForumMutation, 
    useGetForumDetailQuery, 
    useGetAllForumMutation, 
    useDeleteForumMutation, 
} = forumApiSlice;