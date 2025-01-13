import React from "react";

const Prologue = () => {
	return (
		<div className="w-screen flex items-center justify-center">
			<div className="w-full max-w-4xl aspect-video">
				<iframe
					src="https://www.youtube.com/embed/76yQ6bMiQB8?si=CWnpciqKEcXHxeyD"
					title="Tourii Prologue"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
					className="w-full h-full rounded-xl"
				/>
			</div>
		</div>
	);
};

export default Prologue;
