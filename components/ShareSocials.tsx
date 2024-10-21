'use client';
import * as React from 'react';
import { faFacebookSquare, faPinterestSquare, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FacebookShareButton, TwitterShareButton, PinterestShareButton } from 'next-share';
import { artist, capitalize } from '@/lib';
import '@/css/components/share-socials.css';

function prepareHashTags(tags: string[]): string[] {
	return tags.filter(Boolean).map((tag) =>
		tag
			.split(' ')
			.map((t) => capitalize(t))
			.join('')
			.replace(' ', '')
	);
}

interface Props {
	title: string;
	url: string;
	media: string;
	tags?: string[];
	showFacebook?: boolean;
	showTwitter?: boolean;
	showPinterest?: boolean;
}

export const ShareSocials: React.FC<Props> = ({ title, url, media, tags = [], showFacebook = true, showTwitter = true, showPinterest = true }) => {
	const hashtags = prepareHashTags([artist.name, artist.occupation, ...tags]);
	return (
		<aside className="share-socials">
			<h3>Delen:</h3>
			{showFacebook ? (
				<FacebookShareButton url={url} quote={title} hashtag={hashtags.join(' #') || undefined}>
					<FontAwesomeIcon icon={faFacebookSquare} size={'lg'} />
				</FacebookShareButton>
			) : null}
			{showTwitter ? (
				<TwitterShareButton url={url} title={title} hashtags={hashtags}>
					<FontAwesomeIcon icon={faSquareXTwitter} size={'lg'} />
				</TwitterShareButton>
			) : null}
			{showPinterest ? (
				<PinterestShareButton url={url} description={title} media={media}>
					<FontAwesomeIcon icon={faPinterestSquare} size={'lg'} />
				</PinterestShareButton>
			) : null}
		</aside>
	);
};
