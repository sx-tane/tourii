"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Settings,
  Clock,
  MapPin,
  Trophy,
  Star,
  Users,
  Crown,
  Zap
} from "lucide-react";
import type { 
  QuestUnlockRule, 
  QuestUnlockCondition, 
  UnlockConditionType 
} from "@/lib/quest-unlock/types";

interface UnlockRuleManagerProps {
  questId: string;
  questTitle: string;
  onRuleChange?: (rule: QuestUnlockRule) => void;
}

/**
 * Admin Interface for Managing Quest Unlock Rules
 * Allows admins to create and edit complex unlock conditions
 */
export function UnlockRuleManager({ 
  questId, 
  questTitle, 
  onRuleChange 
}: UnlockRuleManagerProps) {
  const [rule, setRule] = useState<QuestUnlockRule | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing rule for quest
  useEffect(() => {
    loadQuestRule();
  }, [questId]);

  const loadQuestRule = async () => {
    setIsLoading(true);
    try {
      // In production, load from API
      const mockRule: QuestUnlockRule = {
        questId,
        conditions: [],
        operator: "AND",
        priority: 1,
        enabled: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "admin",
      };
      setRule(mockRule);
    } catch (error) {
      console.error("Failed to load quest rule:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveRule = async () => {
    if (!rule) return;

    setIsLoading(true);
    try {
      // In production, save to API
      console.log("Saving rule:", rule);
      onRuleChange?.(rule);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save rule:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addCondition = (type: UnlockConditionType) => {
    if (!rule) return;

    const newCondition: QuestUnlockCondition = {
      id: `${type}_${Date.now()}`,
      type,
      description: getDefaultDescription(type),
      metadata: getDefaultMetadata(type),
    };

    setRule({
      ...rule,
      conditions: [...rule.conditions, newCondition],
    });
  };

  const updateCondition = (conditionId: string, updates: Partial<QuestUnlockCondition>) => {
    if (!rule) return;

    setRule({
      ...rule,
      conditions: rule.conditions.map(condition =>
        condition.id === conditionId
          ? { ...condition, ...updates }
          : condition
      ),
    });
  };

  const removeCondition = (conditionId: string) => {
    if (!rule) return;

    setRule({
      ...rule,
      conditions: rule.conditions.filter(condition => condition.id !== conditionId),
    });
  };

  const getConditionIcon = (type: UnlockConditionType) => {
    switch (type) {
      case "STORY_COMPLETION": return <Star className="h-4 w-4" />;
      case "QUEST_COMPLETION": return <Trophy className="h-4 w-4" />;
      case "LEVEL_REQUIREMENT": return <Zap className="h-4 w-4" />;
      case "LOCATION_PROXIMITY": return <MapPin className="h-4 w-4" />;
      case "TIME_BASED": return <Clock className="h-4 w-4" />;
      case "PREMIUM_GATE": return <Crown className="h-4 w-4" />;
      case "SOCIAL_REQUIREMENT": return <Users className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  const getConditionColor = (type: UnlockConditionType) => {
    switch (type) {
      case "STORY_COMPLETION": return "bg-blue-100 text-blue-800";
      case "QUEST_COMPLETION": return "bg-green-100 text-green-800";
      case "LEVEL_REQUIREMENT": return "bg-purple-100 text-purple-800";
      case "LOCATION_PROXIMITY": return "bg-yellow-100 text-yellow-800";
      case "TIME_BASED": return "bg-gray-100 text-gray-800";
      case "PREMIUM_GATE": return "bg-red-100 text-red-800";
      case "SOCIAL_REQUIREMENT": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDefaultDescription = (type: UnlockConditionType): string => {
    switch (type) {
      case "STORY_COMPLETION": return "Complete specific story chapters";
      case "QUEST_COMPLETION": return "Complete prerequisite quests";
      case "LEVEL_REQUIREMENT": return "Reach minimum user level";
      case "LOCATION_PROXIMITY": return "Visit specific location";
      case "TIME_BASED": return "Available at scheduled time";
      case "RESOURCE_REQUIREMENT": return "Spend required resources";
      case "PREMIUM_GATE": return "Premium subscription required";
      case "SOCIAL_REQUIREMENT": return "Complete with friends";
      case "MANUAL_ADMIN": return "Manual admin approval";
      default: return "Custom unlock condition";
    }
  };

  const getDefaultMetadata = (type: UnlockConditionType): Record<string, any> => {
    switch (type) {
      case "STORY_COMPLETION":
        return {
          storyId: "",
          chapterIds: [],
          requireAllChapters: true,
        };
      case "QUEST_COMPLETION":
        return {
          questIds: [],
          requireAllQuests: true,
          minimumScore: 0,
        };
      case "LEVEL_REQUIREMENT":
        return {
          minimumLevel: 1,
          levelType: "USER",
        };
      case "LOCATION_PROXIMITY":
        return {
          touristSpotId: "",
          radiusMeters: 100,
          requireCheckin: false,
        };
      case "TIME_BASED":
        return {
          unlockTime: new Date().toISOString(),
          timeZone: "Asia/Tokyo",
        };
      case "RESOURCE_REQUIREMENT":
        return {
          resourceType: "MAGATAMA_POINTS",
          minimumAmount: 100,
          deductOnUnlock: false,
        };
      default:
        return {};
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="animate-spin h-8 w-8 border-2 border-red border-t-transparent rounded-full mx-auto" />
          <p className="mt-2 text-warmGrey">Loading unlock rules...</p>
        </CardContent>
      </Card>
    );
  }

  if (!rule) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-warmGrey">Failed to load quest unlock rules</p>
          <Button onClick={loadQuestRule} className="mt-2">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-charcoal">
              Quest Unlock Rules
            </CardTitle>
            <p className="text-sm text-warmGrey mt-1">
              {questTitle}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button
                  onClick={saveRule}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  disabled={isLoading}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Rules
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Rule Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Condition Operator
            </label>
            <select
              value={rule.operator}
              onChange={(e) => setRule({ ...rule, operator: e.target.value as "AND" | "OR" })}
              disabled={!isEditing}
              className="w-full p-2 border border-warmGrey2 rounded-md focus:ring-2 focus:ring-red focus:border-transparent"
            >
              <option value="AND">ALL conditions must be met (AND)</option>
              <option value="OR">ANY condition must be met (OR)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">
              Rule Status
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rule.enabled}
                  onChange={(e) => setRule({ ...rule, enabled: e.target.checked })}
                  disabled={!isEditing}
                  className="mr-2"
                />
                <span className="text-sm text-charcoal">Enabled</span>
              </label>
            </div>
          </div>
        </div>

        {/* Unlock Conditions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-medium text-charcoal">
              Unlock Conditions ({rule.conditions.length})
            </h3>
            {isEditing && (
              <div className="relative">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addCondition(e.target.value as UnlockConditionType);
                      e.target.value = "";
                    }
                  }}
                  className="p-2 border border-warmGrey2 rounded-md focus:ring-2 focus:ring-red focus:border-transparent"
                >
                  <option value="">Add Condition...</option>
                  <option value="STORY_COMPLETION">Story Completion</option>
                  <option value="QUEST_COMPLETION">Quest Completion</option>
                  <option value="LEVEL_REQUIREMENT">Level Requirement</option>
                  <option value="LOCATION_PROXIMITY">Location Proximity</option>
                  <option value="TIME_BASED">Time-Based</option>
                  <option value="RESOURCE_REQUIREMENT">Resource Requirement</option>
                  <option value="PREMIUM_GATE">Premium Gate</option>
                  <option value="SOCIAL_REQUIREMENT">Social Requirement</option>
                  <option value="MANUAL_ADMIN">Manual Admin</option>
                </select>
              </div>
            )}
          </div>

          {rule.conditions.length === 0 ? (
            <div className="text-center p-8 bg-warmGrey1 rounded-lg">
              <Settings className="h-12 w-12 text-warmGrey mx-auto mb-3" />
              <p className="text-warmGrey mb-4">No unlock conditions configured</p>
              <p className="text-sm text-warmGrey">
                This quest will be unlocked by default. Add conditions to control access.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {rule.conditions.map((condition, index) => (
                <div
                  key={condition.id}
                  className="border border-warmGrey2 rounded-lg p-4 bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex items-center space-x-2">
                        {getConditionIcon(condition.type)}
                        <Badge className={getConditionColor(condition.type)}>
                          {condition.type.replace("_", " ")}
                        </Badge>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-sm font-medium text-charcoal">
                          {condition.description}
                        </p>
                        <div className="mt-2 text-xs text-warmGrey">
                          <pre className="whitespace-pre-wrap">
                            {JSON.stringify(condition.metadata, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <Button
                        onClick={() => removeCondition(condition.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red hover:text-red hover:bg-red/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {isEditing && (
                    <div className="mt-3 pt-3 border-t border-warmGrey2">
                      <textarea
                        value={condition.description}
                        onChange={(e) => updateCondition(condition.id, { description: e.target.value })}
                        placeholder="Condition description..."
                        className="w-full p-2 text-sm border border-warmGrey2 rounded-md focus:ring-2 focus:ring-red focus:border-transparent"
                        rows={2}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rule Summary */}
        <div className="bg-warmGrey1 rounded-lg p-4">
          <h4 className="text-sm font-medium text-charcoal mb-2">Rule Summary</h4>
          <p className="text-sm text-warmGrey">
            {rule.conditions.length === 0
              ? "Quest is unlocked by default (no conditions)"
              : `Quest unlocks when ${rule.operator === "AND" ? "ALL" : "ANY"} of the ${rule.conditions.length} condition${rule.conditions.length > 1 ? "s" : ""} ${rule.conditions.length > 1 ? "are" : "is"} met`
            }
          </p>
          <div className="flex items-center space-x-4 mt-2 text-xs text-warmGrey">
            <span>Priority: {rule.priority}</span>
            <span>Status: {rule.enabled ? "Enabled" : "Disabled"}</span>
            <span>Created: {new Date(rule.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}