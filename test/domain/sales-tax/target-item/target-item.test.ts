import { TargetItem } from "../../../../src/domain/sales-tax/target-item/target-item";
import { TargetContractType } from "../../../../src/domain/sales-tax/target-item/target-contract-type";
import { TargetProductCategory } from "../../../../src/domain/sales-tax/target-item/target-product-category";
import { TargetProvideType } from "../../../../src/domain/sales-tax/target-item/target-provide-type";
import { TargetItemCandidate } from "../../../../src/domain/sales-tax/target-item/target-item-candidate";

describe(`${TargetItem.name}`, () => {

    const target =
        // 不定期 && 飲食料品 && (譲渡 || 宅配)
        TargetItem.of(
            TargetContractType.of(`不定期`),
            TargetProductCategory.of(`飲食料品`),
            TargetProvideType.of(`譲渡`).or(TargetProvideType.of(`宅配`)))
        .or(
        // 定期 && 新聞 && 宅配
        TargetItem.of(
            TargetContractType.of(`定期`),
            TargetProductCategory.of(`新聞`),
            TargetProvideType.of(`宅配`))
        );

    describe(`isSatisfiedBy()`, () => {
        test.each([
            [ TargetItemCandidate.of(`不定期`, `飲食料品`, `譲渡`) ],
            [ TargetItemCandidate.of(`不定期`, `飲食料品`, `宅配`) ],
            [ TargetItemCandidate.of(`定期`  , `新聞`    , `宅配`) ],
        ])(`対象品目候補に該当する場合、tureを返す`, (candidate) => {
            expect(target.isSatisfiedBy(candidate)).toBeTruthy();
        });
        test.each([
            [ TargetItemCandidate.of(`不定期`, `飲食料品`  , `外食`) ],
            [ TargetItemCandidate.of(`不定期`, `アルコール`, `譲渡`) ],
        ])(`対象品目候補に該当しない場合、falseを返す`, (candidate) => {
            expect(target.isSatisfiedBy(candidate)).toBeFalsy();
        });
    });
});
