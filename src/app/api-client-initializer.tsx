"use client";

import "@/api/api-client-config"; // Updated import path
import { useEffect } from "react";

export default function ApiClientInitializer() {
	useEffect(() => {
		// This component ensures the api-client-config is imported and run on the client.
		// The console.log in api-client-config.ts will confirm it's loaded.
	}, []);
	return null;
}
