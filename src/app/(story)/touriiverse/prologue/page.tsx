"use client";

import PrologueComponent from "@/components/touriiverse-story/prologue-component";
import { prologueChapterData } from "@/lib/data/touriiverse/chapter-data";
import type { NextPage } from "next";

const Prologue: NextPage = () => {
	return (
		<div>
			<div className="absolute -right-0 top-32 h-[90vh] w-[98vw] animate-fadeIn">
				<PrologueComponent chapter={prologueChapterData} />
			</div>
		</div>
	);
};

export default Prologue;
