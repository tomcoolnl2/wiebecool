import * as React from 'react';
import { SectionContainer } from '../SectionContainer';
import { SectionTitle } from '../SectionTitle';
import { ContactForm } from '../ContactForm';
import { GoogleMaps } from '../GoogleMaps';

export const Contact: React.FC = () => {
	return (
		<SectionContainer name={'contact'}>
			<div className="container">
				<div className="tokyo_tm_contact w-full float-left clear-both h-auto py-[100px] px-[0px]">
					<div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
						<div className="title_flex w-full h-auto clear-both flex justify-between items-end">
							<SectionTitle pageName={'Contact'} title={'Neem gerust contact op voor meer informatie'} />
						</div>
					</div>
					<GoogleMaps />
					<ContactForm />
				</div>
			</div>
		</SectionContainer>
	);
};
