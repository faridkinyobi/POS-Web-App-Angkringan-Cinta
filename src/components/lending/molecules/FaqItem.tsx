import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export type FaqProps = {
	question: string;
	answer: string;
	value: string;
};

export default function FaqItem({ question, answer, value }: FaqProps) {
	return (
		<AccordionItem value={value}>
			<AccordionTrigger>
				<h4>{question}</h4>
			</AccordionTrigger>
			<AccordionContent className="flex flex-col gap-4 text-balance">
				<p>{answer}</p>
			</AccordionContent>
		</AccordionItem>
	);
}
