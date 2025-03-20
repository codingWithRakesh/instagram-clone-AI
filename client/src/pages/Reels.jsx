import React from 'react'
import Reel from '../components/Reel'

const Reels = () => {
	const GlobalStyles = () => {
		return (
			<style
				dangerouslySetInnerHTML={{
					__html: `
				::-webkit-scrollbar {
				  width: 1px;
				}
				::-webkit-scrollbar-track {
				  background: #fff;
				}
			  `,
				}}
			/>
		);
	};
	return (
		<div className="second Contaner forReels">
			<GlobalStyles />
			<div className="reelsBox">
				<Reel />
				<Reel />
				<Reel />
			</div>
		</div>
	)
}

export default Reels