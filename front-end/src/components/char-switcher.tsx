"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { FormProvider, useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function CampaignSwitcher({
  campaigns,
}: {
  campaigns: {
    name: string
    logo: React.ElementType
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(campaigns[0])
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  const form = useForm({
    defaultValues: {
      campaignsName: "",
    },
  })

  const handleOpenDialog = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDialogOpen(true)
    setDropdownOpen(false)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg border">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Campanhas
            </DropdownMenuLabel>
            {campaigns.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
              <DropdownMenuItem asChild onClick={handleOpenDialog}>
                  <button className="w-full gap-2 p-2 flex items-center">
                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                      <Plus className="size-4" />
                    </div>
                    <div className="font-medium text-muted-foreground">Criar campanha</div>
                  </button>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </SidebarMenuItem>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quer criar mais uma campanha?</DialogTitle>
              <DialogDescription>
                Insira os dados principais para sua campanha
              </DialogDescription>
            </DialogHeader>

            <FormProvider {...form}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => console.log(data))}>
                  <FormField
                    control={form.control}
                    name="campaignsName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full rounded-md border px-3 py-2 text-sm"
                            placeholder="Nova campanha"
                          />
                        </FormControl>
                        <FormDescription className="font-light">
                          Esse será o nome da sua nova campanha.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-end gap-2">
                    <Button type="submit" variant="ghost" size="sm" className="cursor-pointer mt-4" onClick={() => setDialogOpen(false)}>
                      Na verdade, não
                    </Button>
                    <Button type="submit" variant="default" size="sm" className="cursor-pointer mt-4">
                      Criar
                    </Button>
                  </div>
                </form>
              </Form>
            </FormProvider>
          </DialogContent>
        </Dialog>
    </SidebarMenu>
  )
}