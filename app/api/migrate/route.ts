import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export async function POST() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL DEFAULT '',
      slug TEXT NOT NULL DEFAULT '',
      category TEXT NOT NULL DEFAULT '',
      excerpt TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      date TEXT NOT NULL DEFAULT '',
      published BOOLEAN NOT NULL DEFAULT FALSE,
      featured BOOLEAN NOT NULL DEFAULT FALSE
    )
  `;

  // Seed the existing post — ON CONFLICT means it's safe to run again
  await sql`
    INSERT INTO posts (id, title, slug, category, excerpt, content, date, published, featured)
    VALUES (
      '1745078400000',
      'Addiction & Violence: Understanding the Connection',
      'addiction-and-violence-understanding-the-connection',
      'psychology-of-crime',
      '35% of violent crime victims claimed their attacker was under the influence of alcohol at the time of the assault. When the attacker is an intimate partner, that number jumps to 67%. This is not about excusing perpetrators. This is about understanding how the cycle continues, and how we break it.',
      ${SEED_CONTENT},
      '2026-04-19',
      TRUE,
      TRUE
    )
    ON CONFLICT (id) DO NOTHING
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL DEFAULT '',
      subject TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      read BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  return NextResponse.json({ success: true, message: "Tables created and post seeded." });
}

const SEED_CONTENT = `## Opening Statement

35% of violent crime victims claimed their attacker was under the influence of alcohol at the time of the assault. When the attacker is an intimate partner, a spouse, boyfriend, or girlfriend, that number jumps to **67%**.

Approximately half of all sexual assaults involve alcohol consumption by the perpetrator, the victim, or both. About half of all sexual assault victims report they were drinking at the time of the assault.

---

## Section 1: Victims & Vulnerability

### How Addiction Increases Vulnerability

When someone is under the influence of drugs or alcohol, their brain chemistry is fundamentally altered. Reaction time slows or accelerates unpredictably. Perception of time distorts. Speech becomes slurred. Bodily control diminishes. A person intoxicated cannot consent. Cannot flee. Cannot speak clearly for help.

This vulnerability exists even without prior trauma history. An active addict with no prior assault history is at significantly higher risk of being sexually assaulted simply because their body and mind are compromised.

### The Trauma-Addiction Cycle & Revictimization

But the stakes are higher when prior trauma has occurred.

Survivors of childhood sexual assault carry psychological wounds: nightmares, self-blame, depression, anxiety, chronic pain. Many self-medicate with drugs and alcohol to numb these symptoms and escape PTSD. This creates a devastating paradox: the very substance they use to cope increases their vulnerability to being assaulted again.

Research shows survivors of childhood sexual abuse are **2–3 times more likely** to experience sexual assault again in adulthood. When active addiction is present, this risk compounds exponentially. Survivors who were assaulted as children often find themselves revictimized in adulthood, sometimes repeatedly. They are statistically more vulnerable, and substances amplify that vulnerability further. The exact percentages are difficult to obtain because survivors are typically exposed to high-risk situations post-assault, making accurate data collection challenging. When addiction is layered onto revictimization, the person becomes even more vulnerable, navigating trauma responses and substance-induced altered states simultaneously.

### Why This Happens

People who have experienced sexual trauma develop PTSD symptoms that themselves create vulnerability:

- Dissociation (feeling disconnected from reality)
- Hypervigilance (or conversely, numbness to danger)
- Self-blame (internalized shame that perpetuates risk-taking)
- Depression and anxiety (that make escape harder)
- Suicidal ideation

Add active addiction to this, and the person is caught in a cycle where trauma drives them toward substances, and substances drive them deeper into vulnerability.

We expect people to make good decisions while their brain is actively sabotaging them. Funny how that doesn't work.

---

## Section 2: Perpetrators & Substance Abuse

### How Drugs Damage the Brain

When drugs enter a developing brain, they cause measurable physical damage. They shrink critical memory centers. They disrupt the neural pathways responsible for learning and decision-making. They alter the brain's reward system, making the user prioritize substance-seeking above all else.

Because of how the adolescent brain develops, drugs have more intense effects on teens than on adults. When young people use any psychoactive substance, their brains' reward systems are triggered more powerfully, putting them at far greater risk for addiction and impulsive behavior.

Drugs damage any brain, not just young ones. They shrink critical memory centers. They disrupt the neural pathways responsible for learning and decision-making. They alter the brain's reward system, making the user prioritize substance-seeking above all else.

### Why Age Matters

The younger someone begins using drugs or alcohol, the more severe the neurological damage, and that damage accumulates throughout their lifetime. The human brain continues developing until the mid-20s, particularly the prefrontal cortex, which governs decision-making and impulse control.

A 14-year-old using drugs experiences greater and more widespread brain damage than a 25-year-old using the same substance. The developing adolescent brain is fundamentally more vulnerable to all psychoactive substances.

### How Addiction Damages Impulse Control

Active addiction physically alters the brain regions responsible for impulse control, judgment, and empathy. It shrinks them. Long-term drug and alcohol use causes brain changes that make users prioritize substance-seeking above all else, including moral and legal consequences.

### Perpetrators & Substance Involvement

The statistics are stark:

**On murder:** More than half of convicted murderers were actively abusing drugs at the time of their crime, and almost half were intoxicated. Alcohol was the most commonly abused substance. Different types of murderers showed different patterns, some exhibited extremely high substance abuse rates, others intermediate, and some very low rates.

**On sexual assault:** Perpetrators use substances in approximately 60–65% of sexual assault incidents. Among victims of physically forced rape, the majority reported that the perpetrator was using alcohol or drugs. 75% of all acquaintance rapes involve alcohol and/or drugs.

### Normalization in Addiction Environments

People who grow up in households marked by active addiction witness violence and sexual assault as normalized behavior. When a child sees intoxicated adults committing violence without consequences, that becomes their baseline for "normal." Adding their own substance abuse later amplifies this learned behavior, removing whatever internal inhibitions might have remained.

I am not excusing perpetrators. I am simply exploring the theory that addiction increases the likelihood of violence.

> If we know a damaged brain makes violence more likely, why do we treat addiction as a moral failure instead of a medical emergency?

---

## Section 3A: The Victim Cycle

### The High-Risk Environment of Addiction

When someone is in active addiction, they need connection, friendship, intimacy, human belonging. This isn't because of the appearance of drugs. This is because of human nature. But in active addiction, that need for connection pulls them into specific environments with specific people.

The environment of addiction is high risk. You're around unstable people. You're around people mixing multiple kinds of drugs. You may be around someone who's gotten their hands on a bad batch. All typical things that happen in active addiction. Therefore, you're likely to put yourself in a scary situation. Dealers are usually found by word-of-mouth and friends, so it's high risk in meeting strangers. Dealers can rob you, they can kidnap you, and they can traffic you. Physical danger from the source itself is prominent.

Worst of all, this becomes normalized. Your brain starts to accept that violence, exploitation, illegal activity, and dangerous activity are normal and okay. When you're surrounded by unstable people doing drugs, chaos becomes your normal. You stop recognizing danger. You stop recognizing when someone is taking advantage of you.

### Altered State of Mind Creates Physical Vulnerability

Beyond the environment itself, being under the influence of alcohol and drugs makes you physically defenseless. Your reaction time is much slower. You're more helpless. You're more vulnerable to being robbed, assaulted, or being subjected to other violent crimes while being in an unfamiliar space or even while walking home. You cannot fight back, you cannot run, you cannot protect yourself to your best ability.

### Revictimization: The Cycle Deepens

Research shows survivors of childhood sexual abuse are 2–3 times more likely to experience sexual assault again in adulthood. When active addiction is present, this risk compounds exponentially. Survivors who were assaulted as children often find themselves revictimized in adulthood, sometimes repeatedly. They are statistically more vulnerable, and substances amplify that vulnerability further.

This is not about bad decision-making. This is about the actual environment being predatory.

### A Common Scenario

A girl at a party is under the influence of alcohol and drugs. She's taken too much. Two or three guys notice she's incapacitated. She can't move. She can't speak. She can't consent. Because everyone at the party is on drugs, it goes unnoticed. They take advantage of her. The perpetrators themselves are on drugs, altering their own state of mind.

This happens at small house parties. This happens when friends are hanging out. One person gets way too incapacitated and nobody intervenes because everyone's affected and it's become normalized due to this type of environment.

In environments where drugs and alcohol are normalized, sexual assault is more likely to go unnoticed and uninterrupted. For that matter, any violent crime, such as fighting, robbing, vandalizing, is more likely to occur and go unaddressed.

---

## Section 3B: The Perpetrator Cycle

### Why People Become Addicts

Drug addiction is a chronic disease. Why some people become addicted to drugs while others don't is complex. Some people can take addictive drugs and not become addicted. Others become addicted. Why the difference? It's not one thing. It's a combination of everything. Predisposition. Environment. Trauma. Bad experiences. Peer pressure. The truth is there's not one reason why people become addicts.

But what we know scientifically is that repeated drug use physically alters the brain. Addiction creates intense, overwhelming urges to use again. Once the brain is changed, the person loses the ability to simply say no. They can't stop, even when they want to. This is why relapsing during recovery is extremely common and why addiction is classified as a chronic disease, not a moral failure.

A lot of people take drugs to numb or escape a feeling that they don't want to tackle, or it could be multiple feelings at once. Without realizing that being in active addiction has a high risk of bringing on more trauma and disaster in their life.

### Understanding Does Not Excuse

Understanding why someone uses drugs does not excuse violent criminal behavior. There is a documented link between active addiction and violent acts such as sexual violence and other violent crimes. This is a link, not an excuse.

When brain regions responsible for impulse control, judgment, and empathy are altered due to active addiction, the likelihood of violence increases. The younger someone started using drugs, the more severe the neurological damage. Long-term addiction means cumulative damage to the exact regions that prevent violence.

### A Hypothetical Scenario

A man in his late twenties has been using cocaine and methamphetamine for years. He was sexually abused as a child. He witnessed his father abuse his mother. He grew up in a home where drugs and violence were normal. He's been in active addiction for a decade. His brain regions responsible for impulse control, judgment, and empathy have been damaged by years of stimulant use.

One night, after a multi-day cocaine and methamphetamine binge, he's at a house party. He's paranoid, irritable, aggressive. He sees a woman who's intoxicated. His judgment is severely impaired. His impulse control is gone. His empathy is compromised. He makes a choice that destroys her life.

This is not about excusing him. This is about understanding how someone becomes capable of violence. This is about recognizing the chain: childhood trauma leads to self-medication with drugs, which leads to brain damage, which leads to violent behavior. Understanding this chain doesn't erase his responsibility. It explains how the cycle continues.

---

## Section 4: Reflection Questions

### If we keep punishing addiction instead of treating it, aren't we guaranteeing the next generation of perpetrators?

We spend billions on incarceration. We spend fractions of that on addiction treatment. We don't spread awareness at the magnitude that it should be spread. We criminalize the disease instead of healing it. We don't fix the brain. We don't treat the addiction. We don't break the cycle. We just ensure a future of hell.

### Why aren't we speaking up more in the settings where we see it happen? Why are we turning a blind eye?

When bystanders are intoxicated, intervention becomes even less likely. Alcohol narrows focus and diffuses responsibility. In a room full of drunk people, everyone assumes someone else will step in. No one does.

Intoxication also changes what bystanders see. If a victim is drinking, intoxicated witnesses focus on the victim's "responsibility" for the situation instead of recognizing the danger. They blame the victim instead of the perpetrator. They rationalize staying silent. They convince themselves it's not their problem.

Alcohol doesn't just impair the perpetrator. It impairs the entire room. It makes witnesses into accomplices through silence.

I am heavily interested in learning everything I can about the bystander theory because it deeply disturbs me. Check on my page for my bystander writings.

---

If you understood what I've written, if it strikes the same nerves as mine, if you feel the weight of moral responsibility, then I have to ask you: If you understand the cycle, are you responsible for breaking it? Which cycle will you break, the one in yourself, or the one that you witness?

*— Maria Agrafiotis, 2026*`;
