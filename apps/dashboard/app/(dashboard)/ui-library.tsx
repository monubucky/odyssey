import { ScrollView, Text, View } from "react-native";

import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import Skeleton from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";

export default function UILibraryPage() {
  return (
    <DashboardLayout>
      <ScrollView
        style={{
          flex: 1,
          padding: 24,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "700",
            marginBottom: 30,
          }}
        >
          Design System
        </Text>

        {/* COLORS */}

        <Text
          style={{
            color: "white",
            marginBottom: 12,
            fontSize: 20,
          }}
        >
          Colors
        </Text>

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginBottom: 30,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#F97316",
              borderRadius: 12,
            }}
          />

          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#10B981",
              borderRadius: 12,
            }}
          />

          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: "#EF4444",
              borderRadius: 12,
            }}
          />
        </View>

        {/* BUTTONS */}

        <Text
          style={{
            color: "white",
            marginBottom: 12,
            fontSize: 20,
          }}
        >
          Buttons
        </Text>

        <Button title="Primary Button" />

        <View style={{ height: 24 }} />

        {/* INPUT */}

        <Text
          style={{
            color: "white",
            marginBottom: 12,
            fontSize: 20,
          }}
        >
          Inputs
        </Text>

        <Input placeholder="Restaurant Name" />

        <View style={{ height: 24 }} />

        {/* CARD */}

        <Text
          style={{
            color: "white",
            marginBottom: 12,
            fontSize: 20,
          }}
        >
          Card
        </Text>

        <Card>
          <Text style={{ color: "white" }}>
            Example Card Content
          </Text>
        </Card>

        <View style={{ height: 24 }} />

        {/* LOADING */}

        <Text
          style={{
            color: "white",
            marginBottom: 12,
            fontSize: 20,
          }}
        >
          Loading
        </Text>

        <Skeleton />

        <View style={{ height: 24 }} />

        {/* EMPTY */}

        <Text
          style={{
            color: "white",
            marginBottom: 12,
            fontSize: 20,
          }}
        >
          Empty State
        </Text>

        <EmptyState />
      </ScrollView>
    </DashboardLayout>
  );
}