import React from "react";

const Prologue = () => {
	return (
		<div>
			{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
			<video controls className="z-10 w-full object-cover rounded-xl">
				<source
					src="/video/touriiverse/Prologue-website.mp4"
					type="video/mp4"
				/>
				<track kind="subtitles" label="English" srcLang="en" default />
				Your browser does not support the video tag.
			</video>
		</div>
	);
};

export default Prologue;
