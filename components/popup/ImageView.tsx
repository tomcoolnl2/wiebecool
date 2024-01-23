import * as React from 'react';
import { useClickOutside } from '@/lib/useClickOutside';

const ImgViews: React.FC<{ close: (arg0: boolean) => void; src: string | null }> = ({ close, src }) => {
	//
	let domNode = useClickOutside(() => {
		close(false);
	});

	if (!src) {
		return null;
	}

	return (
		<>
			<div className="mfp-bg mfp-ready" onClick={() => close(false)}></div>
			<div
				className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"
				tabIndex={-1}
				style={{ overflow: 'hidden auto' }}
			>
				<div className={` popup-container mfp-container mfp-s-ready mfp-iframe-holder mfp-img-container`}>
					<div className="mfp-content" ref={domNode}>
						<div className="mfp-iframe-scaler">
							<img className="mfp-img" src={src} alt="" width={undefined} />
						</div>
					</div>
					<div className="mfp-preloader">Loading...</div>
				</div>
			</div>
		</>
	);
};

export const ImageView = () => {
	const [img, setImg] = React.useState<boolean>(false);
	const [imgValue, setImgValue] = React.useState<string | null>(null);

	React.useEffect(() => {
		setTimeout(() => {
			const a = document.querySelectorAll('a');
			a.forEach((a) => {
				if (a.href.includes('assets/img/')) {
					if (a.getAttribute('download') === null) {
						a.addEventListener('click', (e) => {
							e.preventDefault();
							setImgValue(a.href);
							setImg(true);
						});
					}
				}
			});
		}, 1500);
	}, []);

	return <>{img && <ImgViews close={() => setImg(false)} src={imgValue} />}</>;
};