"use client";

import React, { useEffect, useState } from "react";
import ServiceCard from "@/app/components/ui/ServiceCard";
import { getServices, Service } from "@/services/services.service";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import HairdresserCard from "@/app/components/ui/HairdresserCard";
import { User } from "@/interface/user";
import { useAppDispatch, useAppSelector } from "@/store";
import { getHaidressers } from "@/store/user/userSlice";


export default function Hairdressers() {
    const hairdressers = useAppSelector(getHaidressers);
    const { user:currentUser } = useCurrentUser();

    return (
        <div className="bg-white grid grid-cols-1 md:grid-cols-4 gap-6 p-7">
            {hairdressers.map(hairdresser => (
                <HairdresserCard
                key={hairdresser.email}
                id= {hairdresser.id}
                name={hairdresser.name}
                email={hairdresser.email}
                />
            ))
            }
        </div>
    );
}
