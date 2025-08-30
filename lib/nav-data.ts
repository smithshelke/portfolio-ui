
export const baseUrl = "/dashboard"

export const data = {
  navMain: [
    {
      title: "About Me",
      url: "#",
      items: [
        {
          title: "My Story",
          url: `${baseUrl}/about-me`,
        },
        {
          title: "Work Experience",
          url: `${baseUrl}/experiences`,
        },
      ],
    },
    {
      title: "Task Management",
      url: "#",
      items: [
        { title: "Dashboard", url: `${baseUrl}/task-management` },
        { title: "Task Board", url: `${baseUrl}/task-management/board` },
        { title: "Calendar", url: `${baseUrl}/task-management/calendar` },
        { title: "Notes", url: `${baseUrl}/task-management/notes` },
      ],
    },
    
    
    {
      title: "Developer tools",
      url: "#",
      items: [
        { title: "JSON Formatter", url: `${baseUrl}/developer-tools/json-formatter` },
        { title: "Epoch Converter", url: `${baseUrl}/developer-tools/epoch-converter` },
      ],
    },
  {
      title: "Blogs",
      url: "#",
      items: [
        { title: "Neovim", url: `${baseUrl}/blogs/neovim` },
      ],
    },
  ],
}
