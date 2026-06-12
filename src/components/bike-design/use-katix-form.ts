"use client";

import { useCallback, useState } from "react";

export type InspectionType = "electronic" | "legacy";
export type NumberPlateStatus = "with" | "without";
export type MeterHistory = "yes" | "no";
export type OwnerType = "self" | "other" | "dealer";
export type LoanStatus = "paid" | "unpaid" | "none";

export type BikeConditionId =
  | "fine"
  | "battery"
  | "immobile"
  | "oil"
  | "idle"
  | "noise";

export type AccidentId = "tip" | "riding" | "crash" | "none";

export type OriginalDocumentId =
  | "inspection"
  | "liability"
  | "disposal"
  | "paid-off"
  | "transfer"
  | "none";

const BIKE_EXCLUSIVE: BikeConditionId = "fine";
const ACCIDENT_EXCLUSIVE: AccidentId = "none";
const DOCUMENT_EXCLUSIVE: OriginalDocumentId = "none";

function toggleInSet<T extends string>(
  prev: Set<T>,
  id: T,
  exclusiveId?: T
): Set<T> {
  const next = new Set(prev);
  if (exclusiveId && id === exclusiveId) {
    if (next.has(exclusiveId)) {
      next.delete(exclusiveId);
    } else {
      return new Set([exclusiveId]);
    }
    return next;
  }
  if (exclusiveId && next.has(exclusiveId)) {
    next.delete(exclusiveId);
  }
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  return next;
}

export function useKatixForm() {
  const [inspectionType, setInspectionType] = useState<InspectionType | null>(null);
  const [numberPlate, setNumberPlate] = useState<NumberPlateStatus | null>(null);
  const [bikeConditions, setBikeConditions] = useState<Set<BikeConditionId>>(
    () => new Set()
  );
  const [accidents, setAccidents] = useState<Set<AccidentId>>(() => new Set());
  const [meterHistory, setMeterHistory] = useState<MeterHistory | null>(null);
  const [owner, setOwner] = useState<OwnerType | null>(null);
  const [loanStatus, setLoanStatus] = useState<LoanStatus | null>(null);
  const [originalDocuments, setOriginalDocuments] = useState<
    Set<OriginalDocumentId>
  >(() => new Set());

  const [details, setDetails] = useState<Record<string, string>>({
    battery: "",
    immobile: "",
    oil: "",
    idle: "",
    noise: "",
    tip: "",
    riding: "",
    crash: "",
    ownerOther: "",
    bikeDescription: "",
  });

  const setDetail = useCallback((key: string, value: string) => {
    setDetails((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleBikeCondition = useCallback((id: BikeConditionId) => {
    setBikeConditions((prev) => {
      if (id === BIKE_EXCLUSIVE) {
        return prev.has(BIKE_EXCLUSIVE) ? new Set<BikeConditionId>() : new Set([BIKE_EXCLUSIVE]);
      }
      const withoutFine = new Set(prev);
      withoutFine.delete(BIKE_EXCLUSIVE);
      const next = toggleInSet(withoutFine, id);
      return next;
    });
  }, []);

  const toggleAccident = useCallback((id: AccidentId) => {
    setAccidents((prev) => toggleInSet(prev, id, ACCIDENT_EXCLUSIVE));
  }, []);

  const toggleOriginalDocument = useCallback((id: OriginalDocumentId) => {
    setOriginalDocuments((prev) => toggleInSet(prev, id, DOCUMENT_EXCLUSIVE));
  }, []);

  return {
    inspectionType,
    setInspectionType,
    numberPlate,
    setNumberPlate,
    bikeConditions,
    toggleBikeCondition,
    accidents,
    toggleAccident,
    meterHistory,
    setMeterHistory,
    owner,
    setOwner,
    loanStatus,
    setLoanStatus,
    originalDocuments,
    toggleOriginalDocument,
    details,
    setDetail,
  };
}

export type KatixFormState = ReturnType<typeof useKatixForm>;
