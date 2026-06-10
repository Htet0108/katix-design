"use client";

import {
  DetailCheckbox,
  FieldFeedback,
  FieldLabel,
  FormTextarea,
  RadioOption,
  RadioOptionWithDetail,
  SimpleCheckbox,
} from "@/components/shared/form-controls";
import type { KatixFormErrors } from "@/components/bike-design/validate-katix-form";
import type { KatixFormState } from "@/components/bike-design/use-katix-form";

type BikeCustomerFormProps = {
  form: KatixFormState;
  errors: KatixFormErrors;
  showErrors: boolean;
};

export function BikeCustomerForm({ form, errors, showErrors }: BikeCustomerFormProps) {
  const {
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
  } = form;

  const fieldError = (key: string) => (showErrors ? errors[key] : undefined);

  return (
    <div className="flex flex-col gap-6 items-stretch w-full min-w-0">
      {/* ナンバーの登録状況 */}
      <div
        className="content-stretch flex flex-col gap-2 items-start relative shrink-0 w-full min-w-0"
        data-error-field="numberPlate"
      >
        <FieldLabel title="ナンバーの登録状況" required />
        <div className="content-stretch flex flex-col gap-2 items-start justify-center relative shrink-0 w-full">
          <RadioOption
            selected={numberPlate === "with"}
            onSelect={() => setNumberPlate("with")}
            label="ナンバーあり"
          />
          <RadioOption
            selected={numberPlate === "without"}
            onSelect={() => setNumberPlate("without")}
            label="ナンバーなし"
          />
        </div>
        {fieldError("numberPlate") && (
          <FieldFeedback message={fieldError("numberPlate")!} />
        )}
      </div>

      {/* 愛車について */}
      <div
        className="content-stretch flex flex-col gap-2 items-start relative shrink-0 w-full min-w-0"
        data-error-field="bikeConditions"
      >
        <FieldLabel
          title="愛車について"
          required
          hint="当てはまる項目を全て選択してください"
        />
        <div className="content-stretch flex flex-col gap-2 items-start justify-center relative shrink-0 w-full">
          <SimpleCheckbox
            selected={bikeConditions.has("fine")}
            onToggle={() => toggleBikeCondition("fine")}
            label="快調"
          />
          <DetailCheckbox
            selected={bikeConditions.has("battery")}
            onToggle={() => toggleBikeCondition("battery")}
            label="バッテリー切れ"
            description={
              <>
                <p className="mb-0">バッテリー切れはいつ頃からでしょうか。</p>
                <p> ※タンク内にサビがある場合は写真の追加もお願いいたします。</p>
              </>
            }
            placeholder="例）2022年1月頃から。タンク内にサビなし。"
            detailValue={details.battery}
            onDetailChange={(v) => setDetail("battery", v)}
            detailError={fieldError("detail-battery")}
          />
          <DetailCheckbox
            selected={bikeConditions.has("immobile")}
            onToggle={() => toggleBikeCondition("immobile")}
            label="不動"
            description={
              <>
                <p className="mb-0">
                  いつ頃からでしょうか。また、原因がわかればご記入ください。{" "}
                </p>
                <p> ※タンク内にサビがある場合は写真の追加もお願いいたします。</p>
              </>
            }
            placeholder="例）キャブレターの詰まりが原因で3年前から不動。タンク内にサビあり。"
            detailValue={details.immobile}
            onDetailChange={(v) => setDetail("immobile", v)}
            detailError={fieldError("detail-immobile")}
          />
          <DetailCheckbox
            selected={bikeConditions.has("oil")}
            onToggle={() => toggleBikeCondition("oil")}
            label="オイル漏れがる"
            description={<p>オイル漏れの箇所・程度をご記入ください。</p>}
            placeholder="例）フロントフォークからオイルが垂れてくる。"
            detailValue={details.oil}
            onDetailChange={(v) => setDetail("oil", v)}
            detailError={fieldError("detail-oil")}
          />
          <DetailCheckbox
            selected={bikeConditions.has("idle")}
            onToggle={() => toggleBikeCondition("idle")}
            label="アイドリングが不安定"
            description={<p>具体的な症状をお教えください。</p>}
            placeholder="例）回転数が落ちたり上がったりしている。"
            detailValue={details.idle}
            onDetailChange={(v) => setDetail("idle", v)}
            detailError={fieldError("detail-idle")}
          />
          <DetailCheckbox
            selected={bikeConditions.has("noise")}
            onToggle={() => toggleBikeCondition("noise")}
            label="異音がある"
            description={
              <p>どのような異音か具体的にご記入お願いいたします。</p>
            }
            placeholder="例）走行中エンジンの下部からカタカタと異音がする。"
            detailValue={details.noise}
            onDetailChange={(v) => setDetail("noise", v)}
            detailError={fieldError("detail-noise")}
          />
        </div>
        {fieldError("bikeConditions") && (
          <FieldFeedback message={fieldError("bikeConditions")!} />
        )}
      </div>

      {/* 転倒歴 / 事故歴 */}
      <div
        className="content-stretch flex flex-col gap-2 items-start relative shrink-0 w-full min-w-0"
        data-error-field="accidents"
      >
        <FieldLabel
          title="転倒歴 / 事故歴"
          required
          hint="当てはまる項目を全て選択してください"
        />
        <div className="content-stretch flex flex-col gap-2 items-start justify-center relative shrink-0 w-full">
          <DetailCheckbox
            selected={accidents.has("tip")}
            onToggle={() => toggleAccident("tip")}
            label="立ちごけあり"
            description={
              <p>
                左右のどちらに転倒されたか、状況の詳細と傷の箇所を教えてください。
              </p>
            }
            placeholder="例）信号待ち中に、右に転倒。右側マフラー、ミラー、グリップエンドに傷。"
            detailValue={details.tip}
            onDetailChange={(v) => setDetail("tip", v)}
            detailError={fieldError("detail-tip")}
          />
          <DetailCheckbox
            selected={accidents.has("riding")}
            onToggle={() => toggleAccident("riding")}
            label="走行中転倒あり"
            description={
              <p>
                左右のどちらに転倒されたか、状況の詳細と傷の箇所を教えてください。
              </p>
            }
            placeholder="例）低速走行中バランスを崩して右に転倒。右側マフラー、ミラー、グリップエンドに傷。タンクに2cmほどの凹みあり。"
            detailValue={details.riding}
            onDetailChange={(v) => setDetail("riding", v)}
            detailError={fieldError("detail-riding")}
          />
          <DetailCheckbox
            selected={accidents.has("crash")}
            onToggle={() => toggleAccident("crash")}
            label="事故あり"
            description={
              <p>
                左右のどちらに転倒されたか、状況の詳細と傷の箇所を教えてください。
              </p>
            }
            placeholder="例）信号待ち中に後から車がぶつかり右に転倒。傷は全て修理済みのためなし。"
            detailValue={details.crash}
            onDetailChange={(v) => setDetail("crash", v)}
            detailError={fieldError("detail-crash")}
          />
          <SimpleCheckbox
            selected={accidents.has("none")}
            onToggle={() => toggleAccident("none")}
            label="なし"
          />
        </div>
        {fieldError("accidents") && (
          <FieldFeedback message={fieldError("accidents")!} />
        )}
      </div>

      {/* メーター交換・減算歴 */}
      <div
        className="content-stretch flex flex-col gap-2 items-start relative shrink-0 w-full min-w-0"
        data-error-field="meterHistory"
      >
        <FieldLabel title="メーター交換・減算歴について" required />
        <div className="content-stretch flex flex-col gap-2 items-start justify-center relative shrink-0 w-full">
          <RadioOption
            selected={meterHistory === "yes"}
            onSelect={() => setMeterHistory("yes")}
            label="交換・減算歴あり"
          />
          <RadioOption
            selected={meterHistory === "no"}
            onSelect={() => setMeterHistory("no")}
            label="なし"
          />
        </div>
        {fieldError("meterHistory") && (
          <FieldFeedback message={fieldError("meterHistory")!} />
        )}
      </div>

      {/* 愛車の説明 */}
      <div
        className="content-stretch flex flex-col gap-2 items-start relative shrink-0 w-full min-w-0"
        data-error-field="bikeDescription"
      >
        <FieldLabel
          title="愛車の説明"
          required
          hint="カスタム箇所、純正パーツの有無、キズ、サビ、凹みの箇所、付属品、赤キーの有無などあれば記入してください"
        />
        <FormTextarea
          value={details.bikeDescription}
          onChange={(v) => setDetail("bikeDescription", v)}
          placeholder="例）ヨシラムマフラーに変更しています。純正パーツ全てあります。左カウルに立ちゴケキズ、凹みあります。"
          hasError={Boolean(fieldError("bikeDescription"))}
        />
        {fieldError("bikeDescription") && (
          <FieldFeedback message={fieldError("bikeDescription")!} />
        )}
      </div>

      {/* 書類上でのバイク所有者 */}
      <div
        className="content-stretch flex flex-col gap-2 items-start relative shrink-0 w-full min-w-0"
        data-error-field="owner"
      >
        <FieldLabel title="書類上でのバイク所有者" required />
        <div className="content-stretch flex flex-col gap-2 items-start justify-center relative shrink-0 w-full">
          <RadioOption
            selected={owner === "self"}
            onSelect={() => setOwner("self")}
            label="ご本人"
          />
          <RadioOptionWithDetail
            selected={owner === "other"}
            onSelect={() => setOwner("other")}
            label="別の方"
            hint="所有者はどなたでしょうか。※原則、ご売却の際はお立ち合いが必要となります。"
            placeholder="例）息子"
            detailValue={details.ownerOther}
            onDetailChange={(v) => setDetail("ownerOther", v)}
            detailError={fieldError("ownerOther")}
          />
          <RadioOption
            selected={owner === "dealer"}
            onSelect={() => setOwner("dealer")}
            label="購入店"
          />
        </div>
        {fieldError("owner") && <FieldFeedback message={fieldError("owner")!} />}
      </div>

      {/* ローンの返済状況 */}
      <div
        className="content-stretch flex flex-col gap-2 items-start relative shrink-0 w-full min-w-0"
        data-error-field="loanStatus"
      >
        <FieldLabel title="ローンの返済状況" required />
        <div className="content-stretch flex flex-col gap-2 items-start justify-center relative shrink-0 w-full">
          <RadioOption
            selected={loanStatus === "paid"}
            onSelect={() => setLoanStatus("paid")}
            label="完済"
          />
          <RadioOption
            selected={loanStatus === "unpaid"}
            onSelect={() => setLoanStatus("unpaid")}
            label="未完済"
          />
          <RadioOption
            selected={loanStatus === "none"}
            onSelect={() => setLoanStatus("none")}
            label="なし"
          />
        </div>
        {fieldError("loanStatus") && (
          <FieldFeedback message={fieldError("loanStatus")!} />
        )}
      </div>

      {/* お持ちの原本書類 */}
      <div
        className="content-stretch flex flex-col gap-2 items-start relative shrink-0 w-full min-w-0"
        data-error-field="originalDocuments"
      >
        <FieldLabel
          title="お持ちの原本書類"
          required
          hint="当てはまる項目を全て選択してください"
        />
        <div className="content-stretch flex flex-col gap-2 items-start justify-center relative shrink-0 w-full">
          <SimpleCheckbox
            selected={originalDocuments.has("inspection")}
            onToggle={() => toggleOriginalDocument("inspection")}
            label="車検証 (軽自動車届出済証・標識交付書)"
          />
          <SimpleCheckbox
            selected={originalDocuments.has("liability")}
            onToggle={() => toggleOriginalDocument("liability")}
            label="自賠責"
          />
          <SimpleCheckbox
            selected={originalDocuments.has("disposal")}
            onToggle={() => toggleOriginalDocument("disposal")}
            label="廃車証明書"
          />
          <SimpleCheckbox
            selected={originalDocuments.has("paid-off")}
            onToggle={() => toggleOriginalDocument("paid-off")}
            label="完済証明書"
          />
          <SimpleCheckbox
            selected={originalDocuments.has("transfer")}
            onToggle={() => toggleOriginalDocument("transfer")}
            label="譲渡証明書"
          />
          <SimpleCheckbox
            selected={originalDocuments.has("none")}
            onToggle={() => toggleOriginalDocument("none")}
            label="なし"
          />
        </div>
        {fieldError("originalDocuments") && (
          <FieldFeedback message={fieldError("originalDocuments")!} />
        )}
      </div>
    </div>
  );
}
