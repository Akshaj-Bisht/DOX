"use client";
import Loader from "@/components/Loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";

import {
	ClientSideSuspense,
	LiveblocksProvider,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
	const { user: clerkUser } = useUser();

	// Safely access the email address with a fallback for undefined cases
	const currentUserEmail = clerkUser?.emailAddresses?.[0]?.emailAddress;

	return (
		<LiveblocksProvider
			authEndpoint="/api/liveblocks-auth"
			resolveUsers={async ({ userIds }) => {
				const users = await getClerkUsers({ userIds });
				return users;
			}}
			resolveMentionSuggestions={async ({ text, roomId }) => {
				if (!currentUserEmail) {
					console.warn("Current user email is not defined.");
					return [];
				}

				const roomUsers = await getDocumentUsers({
					roomId,
					currentUser: currentUserEmail,
					text,
				});
				return roomUsers;
			}}
		>
			<ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
		</LiveblocksProvider>
	);
};

export default Provider;
