create view Daily_Product_Report as (
	select dr.kode_laporan, dr.kode_spg, u.nama_spg, u.nama_toko, u.depot dr.tanggal,
	sum(case when (kode_product = 'PRD-0002') then volume else 0 end) as `ELASTEX`,
	sum(case when (kode_product = 'PRD-0003') then volume else 0 end) as `WTB_RM`,
	sum(case when (kode_product = 'PRD-0004') then volume else 0 end) as `MATEX_CAT_GENTENG_CCM`,
	sum(case when (kode_product = 'PRD-0006') then volume else 0 end) as `MM_PRIMER`,
	sum(case when (kode_product = 'PRD-0007') then volume else 0 end) as `STONESHIELD`,
	sum(case when (kode_product = 'PRD-0008') then volume else 0 end) as `VINILEX_TINTING`,
	sum(case when (kode_product = 'PRD-0009') then volume else 0 end) as `SPOT_LESS`,
	sum(case when (kode_product = 'PRD-0010') then volume else 0 end) as `MM_CLEAR`,
	sum(case when (kode_product = 'PRD-0011') then volume else 0 end) as `SPORTSKOTE_CCM`,
	sum(case when (kode_product = 'PRD-0012') then volume else 0 end) as `WTB_SOLAREFLECT`,
	sum(case when (kode_product = 'PRD-0014') then volume else 0 end) as `FLAW_LESS`,
	sum(case when (kode_product = 'PRD-0015') then volume else 0 end) as `ROOF_COATING_RM`,
	sum(case when (kode_product = 'PRD-0016') then volume else 0 end) as `TIMBERFINISH_RM`,
	sum(case when (kode_product = 'PRD-0017') then volume else 0 end) as `BODELAC_2IN1_ANTI_KARAT`,
	sum(case when (kode_product = 'PRD-0018') then volume else 0 end) as `VINILEX_RM`,
	sum(case when (kode_product = 'PRD-0019') then volume else 0 end) as `MM_TOP_COAT`,
	sum(case when (kode_product = 'PRD-0020') then volume else 0 end) as `NIPPON_9000`,
	sum(case when (kode_product = 'PRD-0021') then volume else 0 end) as `SEALER_SERIES`,
	sum(case when (kode_product = 'PRD-0022') then volume else 0 end) as `BW_SERIES`,
	sum(case when (kode_product = 'PRD-0023') then volume else 0 end) as `WTB_CCM`,
	sum(case when (kode_product = 'PRD-0024') then volume else 0 end) as `NIPPON_WOOD_STAIN`,
	sum(case when (kode_product = 'PRD-0025') then volume else 0 end) as `SATIN_GLO`,
	sum(case when (kode_product = 'PRD-0013') then volume else 0 end) as `VPRO_PPRO_MATEX_KIMEX_TINTING`,
	sum(case when (kode_product = 'PRD-0005') then volume else 0 end) as `PLATONE_800_or_BEE_BRAND_1000`,
	sum(case when (kode_product = 'PRD-0001') then volume else 0 end) as `NP_ZINC_CHROMATE_GREEN_or_BODELAC_8000_ZINC_CHROMATE`,
	ccm, rm
	from daily_report dr 
	left join product_report pr	
	on dr.kode_spg = pr.kode_spg and dr.tanggal = pr.tanggal
	left join user u on dr.kode_spg = u.kode_spg
	group by dr.kode_spg, dr.tanggal
);

create view Focus_Product_Report as (
	select u.kode_spg, nama_spg, nama_toko, depot,
	sum(case when (kode_focus = 'PRF-0001') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `VPRO_PPRO_MATEX_KIMEX`,
	sum(case when (kode_focus = 'PRF-0002') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `BODELAC_2IN1_ANTI_KARAT_RM`,
	sum(case when (kode_focus = 'PRF-0003') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `F_5100`,
	sum(case when (kode_focus = 'PRF-0004') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `F_5200`,
	sum(case when (kode_focus = 'PRF-0005') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `F_5400`,
	sum(case when (kode_focus = 'PRF-0006') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `PLATONE_800_or_BEE_BRAND_1000`,
	sum(case when (kode_focus = 'PRF-0007') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `FLAWLESS_BW`,
	sum(case when (kode_focus = 'PRF-0008') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `WEATHERBOND_RM`,
	sum(case when (kode_focus = 'PRF-0009') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `MATEX_CAT_GENTENG_CCM`,
	sum(case when (kode_focus = 'PRF-0010') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `STONESHIELD`,
	sum(case when (kode_focus = 'PRF-0011') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `WEATHERBOND_BW`,
	sum(case when (kode_focus = 'PRF-0012') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `NIPPON_WOOD_STAIN_RM`,
	sum(case when (kode_focus = 'PRF-0013') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `ELASTEX_RM`,
	sum(case when (kode_focus = 'PRF-0014') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `TIMBERFINISH_RM`,
	sum(case when (kode_focus = 'PRF-0015') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `SPOTLESS_BW`,
	sum(case when (kode_focus = 'PRF-0016') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `NP_ZINC_CHROMATE_GREEN`,
	sum(case when (kode_focus = 'PRF-0017') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `BODELAC_2IN1_ANTI_KARAT_CCM`,
	sum(case when (kode_focus = 'PRF-0018') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `ROOF_COATING_RM`,
	sum(case when (kode_focus = 'PRF-0019') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `NIPPON_9000`,
	sum(case when (kode_focus = 'PRF-0020') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `SPORTSKOTE_CCM`,
	sum(case when (kode_focus = 'PRF-0021') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `NIPPON_WOOD_STAIN_CCM`,
	sum(case when (kode_focus = 'PRF-0022') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `ELASTEX_TINTING`,
	sum(case when (kode_focus = 'PRF-0023') then DATE_FORMAT(tanggal, '%Y%m%d') else 0 end) as `BODELAC_8000_ZINC_CHROMATE_GREEN`
	from focus_report fr 
	left join user u on fr.kode_spg = u.kode_spg
	group by fr.kode_spg
);

create view Focus_Report as (
	select kode_spg, nama_spg, nama_toko, depot,
	coalesce( date_format( `VPRO_PPRO_MATEX_KIMEX`, '%d-%m-%Y'), 'X') as `VPRO_PPRO_MATEX_KIMEX`,
	coalesce( date_format( `BODELAC_2IN1_ANTI_KARAT_RM`, '%d-%m-%Y'), 'X') as `BODELAC_2IN1_ANTI_KARAT_RM`,
	coalesce( date_format( `F_5100`, '%d-%m-%Y'), 'X') as `F_5100`,
	coalesce( date_format( `F_5200`, '%d-%m-%Y'), 'X') as `F_5200`,
	coalesce( date_format( `F_5400`, '%d-%m-%Y'), 'X') as `F_5400`,
	coalesce( date_format( `PLATONE_800_or_BEE_BRAND_1000`, '%d-%m-%Y'), 'X') as `PLATONE_800_or_BEE_BRAND_1000`,
	coalesce( date_format( `FLAWLESS_BW`, '%d-%m-%Y'), 'X') as `FLAWLESS_BW`,
	coalesce( date_format( `WEATHERBOND_RM`, '%d-%m-%Y'), 'X') as `WEATHERBOND_RM`,
	coalesce( date_format( `MATEX_CAT_GENTENG_CCM`, '%d-%m-%Y'), 'X') as `MATEX_CAT_GENTENG_CCM`,
	coalesce( date_format( `STONESHIELD`, '%d-%m-%Y'), 'X') as `STONESHIELD`,
	coalesce( date_format( `WEATHERBOND_BW`, '%d-%m-%Y'), 'X') as `WEATHERBOND_BW`,
	coalesce( date_format( `NIPPON_WOOD_STAIN_RM`, '%d-%m-%Y'), 'X') as `NIPPON_WOOD_STAIN_RM`,
	coalesce( date_format( `ELASTEX_RM`, '%d-%m-%Y'), 'X') as `ELASTEX_RM`,
	coalesce( date_format( `TIMBERFINISH_RM`, '%d-%m-%Y'), 'X') as `TIMBERFINISH_RM`,
	coalesce( date_format( `SPOTLESS_BW`, '%d-%m-%Y'), 'X') as `SPOTLESS_BW`,
	coalesce( date_format( `NP_ZINC_CHROMATE_GREEN`, '%d-%m-%Y'), 'X') as `NP_ZINC_CHROMATE_GREEN`,
	coalesce( date_format( `BODELAC_2IN1_ANTI_KARAT_CCM`, '%d-%m-%Y'), 'X') as `BODELAC_2IN1_ANTI_KARAT_CCM`,
	coalesce( date_format( `ROOF_COATING_RM`, '%d-%m-%Y'), 'X') as `ROOF_COATING_RM`,
	coalesce( date_format( `NIPPON_9000`, '%d-%m-%Y'), 'X') as `NIPPON_9000`,
	coalesce( date_format( `SPORTSKOTE_CCM`, '%d-%m-%Y'), 'X') as `SPORTSKOTE_CCM`,
	coalesce( date_format( `NIPPON_WOOD_STAIN_CCM`, '%d-%m-%Y'), 'X') as `NIPPON_WOOD_STAIN_CCM`,
	coalesce( date_format( `ELASTEX_TINTING`, '%d-%m-%Y'), 'X') as `ELASTEX_TINTING`,
	coalesce( date_format( `BODELAC_8000_ZINC_CHROMATE_GREEN`, '%d-%m-%Y'), 'X') as `BODELAC_8000_ZINC_CHROMATE_GREEN`
	from Focus_Product_Report 
);

create view Absen_Report as (
	SELECT kode_absen, a.kode_spg, nama_spg, nama_toko, depot, tanggal,
	CAST(COALESCE(jam_masuk, ' ') as CHAR) as jam_masuk,
	COALESCE(lokasi_masuk, ' ') as lokasi_masuk,
	CAST(COALESCE(jam_pulang, ' ') as CHAR) as jam_pulang,
	COALESCE(lokasi_pulang, ' ') as lokasi_pulang
	FROM absen a LEFT JOIN user u ON a.kode_spg = u.kode_spg
);

SELECT f.kode_focus, nama_focus, 
coalesce(date_format(tanggal, '%d-%m-%Y'), '') as tanggal,
(case when (tanggal is not null) then 'SUDAH MASUK' else 'BELUM MASUK' end) as status
FROM focus f left join focus_report fr 
on f.kode_focus = fr.kode_focus AND kode_spg = '?'
