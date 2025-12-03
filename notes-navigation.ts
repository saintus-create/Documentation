// Notes Navigation Configuration
// Place this in your project's lib folder

export type NoteNavItem = {
	title: string;
	href?: string;
	disabled?: boolean;
	external?: boolean;
	label?: string;
	indicator?: "new" | "updated";
};

export type NotesSidebarNavItem = NoteNavItem & {
	items: NotesSidebarNavItem[];
};

// Sample navigation structure - replace with your actual notes
function generateNotesNav(): NotesSidebarNavItem[] {
	const notesNavItems: NotesSidebarNavItem[] = [
		{
			title: "Getting Started",
			href: "/notes/getting-started",
			items: [],
		},
		{
			title: "JavaScript",
			href: "/notes/javascript",
			items: [],
		},
		{
			title: "TypeScript",
			href: "/notes/typescript",
			items: [],
		},
		{
			title: "React",
			href: "/notes/react",
			items: [],
		},
		{
			title: "Svelte",
			href: "/notes/svelte",
			indicator: "new",
			items: [],
		},
	];

	return notesNavItems;
}

function generateFrontendNav(): NotesSidebarNavItem[] {
	return [
		{
			title: "HTML Basics",
			href: "/notes/frontend/html-basics",
			items: [],
		},
		{
			title: "CSS Fundamentals",
			href: "/notes/frontend/css-fundamentals",
			items: [],
		},
		{
			title: "Responsive Design",
			href: "/notes/frontend/responsive-design",
			items: [],
		},
		{
			title: "Animations",
			href: "/notes/frontend/animations",
			items: [],
		},
	];
}

function generateBackendNav(): NotesSidebarNavItem[] {
	return [
		{
			title: "Node.js",
			href: "/notes/backend/nodejs",
			items: [],
		},
		{
			title: "Express",
			href: "/notes/backend/express",
			items: [],
		},
		{
			title: "Databases",
			href: "/notes/backend/databases",
			items: [],
		},
		{
			title: "APIs",
			href: "/notes/backend/apis",
			items: [],
		},
	];
}

function generateDevOpsNav(): NotesSidebarNavItem[] {
	return [
		{
			title: "Docker",
			href: "/notes/devops/docker",
			items: [],
		},
		{
			title: "CI/CD",
			href: "/notes/devops/cicd",
			items: [],
		},
		{
			title: "Deployment",
			href: "/notes/devops/deployment",
			items: [],
		},
	];
}

const notesNav = generateNotesNav();
const frontendNav = generateFrontendNav();
const backendNav = generateBackendNav();
const devopsNav = generateDevOpsNav();

// Main sidebar navigation structure
export const notesSidebarNavItems: NotesSidebarNavItem[] = [
	{
		title: "Quick Start",
		items: notesNav,
	},
	{
		title: "Frontend",
		items: frontendNav,
	},
	{
		title: "Backend",
		items: backendNav,
	},
	{
		title: "DevOps",
		items: devopsNav,
	},
];

// Helper function to get all nav items as a flat list (for prev/next navigation)
export function getAllNoteNavItems(): Array<NotesSidebarNavItem & { index: number }> {
	return [
		...notesNav,
		...frontendNav,
		...backendNav,
		...devopsNav,
	].map((item, index) => ({
		...item,
		index,
	}));
}

const allNoteNavItems = getAllNoteNavItems();

// Find previous and next notes for navigation
export function findNoteNeighbors(pathName: string): {
	previous: NotesSidebarNavItem | null;
	next: NotesSidebarNavItem | null;
} {
	const path = pathName.split("?")[0].split("#")[0];
	const index = allNoteNavItems.findIndex((item) => item.href === path);

	const previous: NotesSidebarNavItem | null = index > 0 ? allNoteNavItems[index - 1] : null;
	const next: NotesSidebarNavItem | null = index < allNoteNavItems.length - 1 ? allNoteNavItems[index + 1] : null;

	return { previous, next };
}
