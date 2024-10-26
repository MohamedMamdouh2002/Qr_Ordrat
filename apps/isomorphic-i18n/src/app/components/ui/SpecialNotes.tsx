'use client';
import { useTranslation } from '@/app/i18n/client';
import cn from '@utils/class-names';
import { AnimatePresence } from 'framer-motion';
import { NotepadText } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Sheet } from 'react-modal-sheet';

type Props = { lang:string, des?: string; className?: string; notes: string; setNotes: (val: string) => void };

function SpecialNotes({ lang ,des, className, notes, setNotes }: Props) {
	const [showNoteInput, setShowNoteInput] = useState(false);
	const { t } = useTranslation(lang!, 'order');

	const ref = useRef<HTMLTextAreaElement>(null);
	useEffect(() => {
		if (showNoteInput) {
			ref.current?.focus();
		}
	}, [showNoteInput]);
	return (
		<>
			<div className={cn('flex items-center justify-between py-4', className)}>
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-2">
						<NotepadText size={des ? 24 : 16} />
						<div className="flex flex-col">
							{t('Any-SpecialRequests')}
							{(des || notes) && (
								<p className="text-sm text-black/75">{notes != '' ? notes : des}</p>
							)}
						</div>
					</div>
				</div>
				<button onClick={() => setShowNoteInput(true)} className="text-mainColor font-bold">
					{notes ? `${t('Edit-notes')}` : `${t('Add-notes')}`} 
				</button>
			</div>
			<Sheet
				isOpen={showNoteInput}
				onClose={() => setShowNoteInput(false)}
				detent="content-height"
				disableScrollLocking={true}
			>
				<Sheet.Container className="items-center">
					<Sheet.Header />
					<Sheet.Content className="container">
						<div className=" flex flex-col gap-2 pb-5">
							<label htmlFor="notes" className="text-black/75 font-bold">
								{t('Special-request')}
							</label>
							<textarea
								ref={ref}
								id="notes"
								value={notes}
								onChange={e => setNotes(e.target.value)}
								className="
									border-2 border-muted rounded-lg px-3 py-2
									focus:border-mainColor focus:ring-mainColor focus:outline-none
									hover:border-mainColor
									transition-all duration-200
								"
							></textarea>
						</div>
					</Sheet.Content>
				</Sheet.Container>
				<Sheet.Backdrop onTap={() => setShowNoteInput(false)} />
			</Sheet>
		</>
	);
}

export default SpecialNotes;
