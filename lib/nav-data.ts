
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
      title: "Oncall",
      url: "#",
      items: [
        { title: "Logs", url: `${baseUrl}/oncall/logs` },
        { title: "Feature Flags", url: `${baseUrl}/oncall/feature-flags` },
        { title: "Schedule", url: `${baseUrl}/oncall/schedule` },
        { title: "Queries", url: `${baseUrl}/oncall/common-queries` },
      ],
    },
    {
      title: "Developer Tools",
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
        { title: "Why I Use Neovim", url: `${baseUrl}/blogs/neovim` },
      ],
    },
  ],
}
