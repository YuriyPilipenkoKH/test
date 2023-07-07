import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import CommentsScreen from "../CommentsScreen/CommentsScreen";


export default function Home() {

    const Tabs = createBottomTabNavigator();
    const navigation = useNavigation();
    return (
        <></>
    )
}