interface CandidateInfo {
  name: string
  description: string
}

export const candidatesEn: CandidateInfo[] = [
  {
    "name": "Leg Raise",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Gymnast Stretch",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Standing Doggy",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Against the Wall",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Missionary",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Suspension",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Kneading Dough",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Shoulder Hook",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Root Wrap",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Power Drill",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Flower Bud",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Waist Lift Doggy",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Uprooted Willow",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Pole Dance",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "X Cross",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Buttock Hold",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Moon Scoop",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Wheelbarrow",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Leg Clasp",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Trampoline",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Close Fit",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Cross Shape",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Crane Rider",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Lotus Seat",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Wave Motion",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Cowgirl",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Jack Lift",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Arch Bridge",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Side Entry",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Kneeling Push",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Seed Planting",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Side Pour",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Kneeling Doggy",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Sedan Chair",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Charging Forward",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Gold Mining",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Floating",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Takeoff",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Upward Gaze",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Steering",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Docking",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Stacked",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Tumbler",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Seated Hips",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Straddle",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Rowing",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Shoulder Press",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Magnetic Pull",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Butterfly",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Exploration",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Chain Lock",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  },
  {
    "name": "Spiral Wrap",
    "description": "Fate has spoken! Go with the flow and enjoy the moment."
  }
]

export const candidatesDescriptionsEn: Record<string, string> =
  Object.fromEntries(candidatesEn.map((c) => [c.name, c.description]))

export const defaultCandidatesEn: string[] = candidatesEn.map((c) => c.name)
