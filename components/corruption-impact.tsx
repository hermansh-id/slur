"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import {
  School,
  Hospital,
  RouteIcon as Road,
  Home,
  Users,
  GraduationCap,
  Building,
  Bed,
  Syringe,
  Landmark,
} from "lucide-react"

const COLORS = ["hsl(var(--destructive))", "hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--accent))"]

const educationData = [
  { name: "Schools That Could Be Built", value: 230 },
  { name: "Teacher Salaries (1 Year)", value: 5750 },
  { name: "Student Scholarships", value: 11500 },
]

const healthcareData = [
  { name: "Community Health Centers", value: 115 },
  { name: "Hospital Beds", value: 2300 },
  { name: "Vaccine Doses", value: 1150000 },
]

const infrastructureData = [
  { name: "Kilometers of Roads", value: 460 },
  { name: "Bridges", value: 92 },
  { name: "Public Housing Units", value: 2300 },
]

export function CorruptionImpact() {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (!cx || !cy || !midAngle || !innerRadius || !outerRadius || !percent) {
      return null
    }

    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">{payload[0].value.toLocaleString('en-US')}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>What Could Have Been Built Instead</CardTitle>
        <CardDescription>The total amount lost to corruption (Rp 10.06 Trillion) could have funded:</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="education">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="education" className="flex items-center gap-2">
              <School className="h-4 w-4" />
              <span>Education</span>
            </TabsTrigger>
            <TabsTrigger value="healthcare" className="flex items-center gap-2">
              <Hospital className="h-4 w-4" />
              <span>Healthcare</span>
            </TabsTrigger>
            <TabsTrigger value="infrastructure" className="flex items-center gap-2">
              <Road className="h-4 w-4" />
              <span>Infrastructure</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="education">
            <div className="flex flex-col md:flex-row items-center">
              <ChartContainer className="h-[300px] w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={educationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {educationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="w-full md:w-1/2 space-y-4 p-4">
                <h3 className="text-lg font-medium">Education Impact</h3>
                <p className="text-muted-foreground">
                  The money lost to corruption could have built 230 new schools, paid 5,750 teachers for a year, or
                  funded 11,500 student scholarships.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <School className="h-8 w-8 mb-2 text-primary" />
                    <span className="text-2xl font-bold">230</span>
                    <span className="text-xs text-center text-muted-foreground">New Schools</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <Users className="h-8 w-8 mb-2 text-destructive" />
                    <span className="text-2xl font-bold">5,750</span>
                    <span className="text-xs text-center text-muted-foreground">Teacher Salaries</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <GraduationCap className="h-8 w-8 mb-2 text-secondary" />
                    <span className="text-2xl font-bold">11,500</span>
                    <span className="text-xs text-center text-muted-foreground">Scholarships</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="healthcare">
            <div className="flex flex-col md:flex-row items-center">
              <ChartContainer className="h-[300px] w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthcareData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {healthcareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="w-full md:w-1/2 space-y-4 p-4">
                <h3 className="text-lg font-medium">Healthcare Impact</h3>
                <p className="text-muted-foreground">
                  The money lost to corruption could have built 115 community health centers, provided 2,300 hospital
                  beds, or purchased 1.15 million vaccine doses.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <Building className="h-8 w-8 mb-2 text-primary" />
                    <span className="text-2xl font-bold">115</span>
                    <span className="text-xs text-center text-muted-foreground">Health Centers</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <Bed className="h-8 w-8 mb-2 text-destructive" />
                    <span className="text-2xl font-bold">2,300</span>
                    <span className="text-xs text-center text-muted-foreground">Hospital Beds</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <Syringe className="h-8 w-8 mb-2 text-secondary" />
                    <span className="text-2xl font-bold">1.15M</span>
                    <span className="text-xs text-center text-muted-foreground">Vaccine Doses</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="infrastructure">
            <div className="flex flex-col md:flex-row items-center">
              <ChartContainer className="h-[300px] w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={infrastructureData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {infrastructureData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>

              <div className="w-full md:w-1/2 space-y-4 p-4">
                <h3 className="text-lg font-medium">Infrastructure Impact</h3>
                <p className="text-muted-foreground">
                  The money lost to corruption could have built 460 kilometers of roads, 92 bridges, or 2,300 public
                  housing units.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <Road className="h-8 w-8 mb-2 text-primary" />
                    <span className="text-2xl font-bold">460</span>
                    <span className="text-xs text-center text-muted-foreground">KM of Roads</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <Landmark className="h-8 w-8 mb-2 text-destructive" />
                    <span className="text-2xl font-bold">92</span>
                    <span className="text-xs text-center text-muted-foreground">Bridges</span>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <Home className="h-8 w-8 mb-2 text-secondary" />
                    <span className="text-2xl font-bold">2,300</span>
                    <span className="text-xs text-center text-muted-foreground">Housing Units</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

