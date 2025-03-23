import { Contest, LeaderboardRow } from '@/app/interface';
import { apiSlice } from '../services/apiSlice';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';


const contestApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getAllContest: builder.query<Contest[], void>({
            query: () => ({
                url: '/contest/all',
                method: 'GET',
                headers: {
					'Authorization': 'Bearer ' + Cookies.get('accessToken'),
				},
            }),
            transformResponse: (response: { data: { contests: Contest[] } }) => {
                return response.data.contests
            },
        }),
        getContestById: builder.query<Contest, string>({
            query: (contestId: string) => ({
                url: `/contest/data/${contestId}`,
                method: 'GET',
                headers: {
					'Authorization': 'Bearer ' + Cookies.get('accessToken'),
				},
            }),
            transformResponse: (response: { data: { contest: Contest } }) => response.data.contest,
        }),
        createContest: builder.mutation({
            query: (contest: Contest) => ({
                url: '/contest/create',
                method: 'POST',
                headers: {
					'Authorization': 'Bearer ' + Cookies.get('accessToken'),
				},
                body: {...contest, contestId: uuidv4()},
            }),
        }),
        editContest: builder.mutation({
            query: (contest: Contest) => ({
                url: '/contest/edit',
                method: 'POST',
                headers: {
					'Authorization': 'Bearer ' + Cookies.get('accessToken'),
				},
                body: contest,
            }),
        }),
        deleteContest: builder.mutation({
            query: (contestId: string) => ({
                url: `/contest/delete/${contestId}`,
                headers: {
					'Authorization': 'Bearer ' + Cookies.get('accessToken'),
				},
                method: 'DELETE',
            }),
        }),
        joinContest: builder.mutation({
            query: ({teamUsername, contestId}) => ({
                url: '/contest/join-contest',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
                body: {teamUsername, contestId},
            }),
        }),
        banTeam: builder.mutation({
            query: ({contestId, teamUsername}) => ({
                url: '/contest/ban-team',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
                body: {contestId, teamUsername},
            }),
        }),
        unBanTeam: builder.mutation({
            query: ({contestId, teamUsername}) => ({
                url: '/contest/unban-team',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
                body: {contestId, teamUsername},
            }),
        }),
        kickTeam: builder.mutation({
            query: ({contestId, teamUsername}) => ({
                url: '/contest/kick-team',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
                body: {contestId, teamUsername},
            }),
        }),
        getLeaderboard: builder.query<LeaderboardRow[], any>({
            query: ({contestName}) => ({
                url: `/contest/leaderboard/${contestName}`,
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('accessToken'),
                },
            }),
            transformResponse: (response: { data: { leaderboard: LeaderboardRow[] } }) => {
                return response.data.leaderboard
            }
        }),
	}),
});

export const { useGetAllContestQuery, useGetContestByIdQuery, useCreateContestMutation, useEditContestMutation, useDeleteContestMutation, useJoinContestMutation, useBanTeamMutation, useUnBanTeamMutation, useKickTeamMutation, useGetLeaderboardQuery } = contestApiSlice;
