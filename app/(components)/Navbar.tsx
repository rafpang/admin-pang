"use client";
import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import icnLogo from "../../public/icn-logo.png";

import Cookies from "js-cookie";

type NavbarPropTypes = {
    window?: () => Window;
};

const drawerWidth = 240;

const menuItems = [
    {
        text: "Home",
        path: "/",
    },
    {
        text: "Orders",
        path: "/orders",
    },
    {
        text: "Audience",
        path: "/audience",
    },
    {
        text: "Notifications",
        path: "/notifications",
    },
    {
        text: "Products",
        path: "/products",
    },
];

export default function Navbar({ window }: NavbarPropTypes) {
    const router = useRouter();

    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    function handleLogout() {
        try {
            Cookies.remove("access_token_cookie");
            if (Cookies.get("refresh_token_cookie")) {
                Cookies.remove("refresh_token_cookie");
            }
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    }

    function handleDrawerToggle(): void {
        setMobileOpen((prevState) => !prevState);
    }

    const drawer = (
        <Box sx={{ width: drawerWidth }}>
            <Box sx={{ textAlign: "center", marginTop: 2, marginBottom: 2 }}>
                <Image src={icnLogo} alt="icnLogo" width={40} height={40} />
            </Box>
            <Divider />
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: "center" }}
                            onClick={() => router.push(item.path)}
                        >
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton
                        sx={{ textAlign: "center" }}
                        onClick={handleLogout}
                    >
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex", marginBottom: 20 }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ backgroundColor: "#333" }}>
                <Toolbar
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <Image
                            src={icnLogo}
                            alt="icnLogo"
                            width={40}
                            height={40}
                            onClick={() => router.push("/")}
                        />
                    </Box>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {menuItems.slice(1).map((item, index) => (
                            <Button
                                key={index}
                                sx={{ color: "#fff" }}
                                onClick={() => router.push(item.path)}
                            >
                                {item.text}
                            </Button>
                        ))}
                        <Button sx={{ color: "#fff" }} onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
