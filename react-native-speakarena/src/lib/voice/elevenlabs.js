import { COACH_AGENT_ID, DEBRIEF_AGENT_ID } from '../../data/constants';

export function getCoachSessionConfig({ exerciseType, prompt, profile } = {}) {
  const dynamicVariables = {};

  if (exerciseType) dynamicVariables.exercise_type = exerciseType;
  if (prompt) dynamicVariables.prompt = prompt;
  if (profile?.headlineRole) dynamicVariables.user_role = profile.headlineRole;
  if (profile?.industry) dynamicVariables.user_industry = profile.industry;
  if (Array.isArray(profile?.speakingWeaknesses) && profile.speakingWeaknesses.length) {
    dynamicVariables.weak_areas = profile.speakingWeaknesses.join(', ');
  }
  if (Array.isArray(profile?.skills) && profile.skills.length) {
    dynamicVariables.user_skills = profile.skills.slice(0, 5).join(', ');
  }

  return {
    agentId: COACH_AGENT_ID,
    dynamicVariables,
  };
}

export function getDebriefSessionConfig({ debateResult, topic } = {}) {
  const dynamicVariables = {};

  if (topic) dynamicVariables.debate_topic = topic;
  if (debateResult?.winner) dynamicVariables.winner = debateResult.winner;
  if (debateResult?.score_a != null) dynamicVariables.score_a = String(debateResult.score_a);
  if (debateResult?.score_b != null) dynamicVariables.score_b = String(debateResult.score_b);
  if (debateResult?.reasoning) dynamicVariables.reasoning = debateResult.reasoning;
  if (debateResult?.feedback_a) dynamicVariables.feedback_a = debateResult.feedback_a;
  if (debateResult?.feedback_b) dynamicVariables.feedback_b = debateResult.feedback_b;

  return {
    agentId: DEBRIEF_AGENT_ID,
    dynamicVariables,
  };
}
